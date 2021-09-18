import argon2, { hash } from "argon2";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import generatePassword from "../../../utils/generatePassword";
import sendMail from "../../../utils/sendMail";
import { Context } from "../../context";
import verifyToken from "../../../utils/verify-token";
import moment from "moment";

interface addUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  accountNumber: string;
  productKey: string;
}

interface registerUserArgs {
  accountNumber: string;
  contactNumber: string;
}

interface checkIfCredsMatches {
  accountNumber: string;
  password: string;
}

interface checkIfTOTPMatches extends checkIfCredsMatches {
  totpToken: string;
}

export const userResolver = {
  Query: {
    findAllUsers: async (_: any, __: any, context: Context) => {
      try {
        const users = await context.prisma.user.findMany({
          select: {
            id: true,
            accountNumber: true,
            amount: true,
            contactNumber: true,
            email: true,
            firstName: true,
            lastName: true,
            hardwareTokenId: true,
            hardwareToken: true,
            status: true,
          },
        });
        if (users) {
          return {
            data: users,
            errors: null,
            success: true,
          };
        }
        return exceptionErrorResponse("error while fetching all users");
      } catch (e) {
        return exceptionErrorResponse("error while fetching all users");
      }
    },
    loggedInUser: async (_: any, __: any, context: Context) => {
      if (context.authUser.success) {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.authUser.data.id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            accountNumber: true,
            isExpired: true,
          },
        });
        if (!user) {
          return {
            success: false,
            errors: [
              {
                message: "User not logged in",
              },
            ],
          };
        }
        return {
          success: true,
          data: { ...user, isPasswordExpired: user.isExpired },
        };
      }
      return {
        success: false,
        errors: [
          {
            message: "User not logged in",
          },
        ],
      };
    },
    getUserInfo: async (_: any, args: { id: string }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
        select: {
          accountNumber: true,
          amount: true,
          contactNumber: true,
          email: true,
          firstName: true,
          hardwareTokenId: true,
          lastName: true,
          status: true,
        },
      });

      const transactions = await context.prisma.userAndTranscations.findMany({
        where: {
          OR: [
            {
              fromUser: args.id,
            },
            {
              toUser: args.id,
            },
          ],
        },
      });

      if (!user) {
        return {
          success: false,
          errors: [
            {
              message: "User not logged in",
            },
          ],
        };
      }
      return {
        data: {
          user: user,
          transactions: transactions,
        },
        success: true,
      };
    },
  },
  Mutation: {
    addUser: async (_: any, args: addUserArgs, context: Context) => {
      try {
        const { productKey, ...userInfo } = args;
        //TODO: Add is active check
        const hardwareToken = await context.prisma.hardwareToken.findUnique({
          where: { productKey: args.productKey },
        });
        if (!hardwareToken) {
          return exceptionErrorResponse("No such token");
        }
        // Checking whether some other users are assigned that token
        const isAssignedToOther = await context.prisma.user.findFirst({
          where: {
            hardwareToken: {
              productKey: args.productKey,
            },
          },
        });

        if (isAssignedToOther) {
          return exceptionErrorResponse("Already assigned token");
        }

        // Checking if email matches with someone else
        const isSomeoneHavingSameEmail = await context.prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (isSomeoneHavingSameEmail) {
          return exceptionErrorResponse("Email already exists");
        }

        // Checking if contact number matches with someone else

        // Checking if email matches with someone else
        const isSomeoneHavingSameContactNumber =
          await context.prisma.user.findFirst({
            where: {
              contactNumber: args.contactNumber,
            },
          });

        if (isSomeoneHavingSameContactNumber) {
          return exceptionErrorResponse("Contact Number already exists");
        }
        const password = await generatePassword();
        const user = await context.prisma.user.create({
          data: {
            ...userInfo,
            password: password.hashedPassword,
            hardwareToken: {
              connect: {
                id: hardwareToken.id,
              },
            },
          },
        });
        if (!user) {
          return exceptionErrorResponse(
            "Something went wrong while adding user"
          );
        }
        return {
          data: user,
          success: true,
        };
      } catch (err) {
        console.log(err);
        return exceptionErrorResponse("Something went wrong while adding user");
      }
    },
    async registerUser(_: any, args: registerUserArgs, context: Context) {
      try {
        const user = await context.prisma.user.findFirst({
          where: {
            ...args,
            status: {
              in: ["BLOCKED", "NOT_ACTIVE"],
            }, // To check whether the user has already activated his/her account
          },
        });
        if (!user) {
          return exceptionErrorResponse(
            "No such account exists or check your email"
          );
        }
        const password = await generatePassword();
        const updatedUser = await context.prisma.user.update({
          data: {
            status: "ACTIVE",
            password: password.hashedPassword,
            isExpired: true, // On the basics of this, trigger the set password in frontend
          },
          where: {
            id: user.id,
          },
        });
        if (!updatedUser) {
          return exceptionErrorResponse(
            "Something went wrong while activating user"
          );
        }
        await sendMail({
          to: user.email,
          password: password.password,
          username: user.accountNumber,
        });
        return {
          data: true,
          success: true,
        };
      } catch (err) {
        console.log(err);
        return exceptionErrorResponse(
          "Something went wrong while registering user"
        );
      }
    },
    checkIfCredsMatches: async (
      _: any,
      args: checkIfCredsMatches,
      context: Context
    ) => {
      try {
        const user = await context.prisma.user.findUnique({
          where: {
            accountNumber: args.accountNumber,
          },
        });
        if (!user || !(await argon2.verify(user?.password, args.password))) {
          return exceptionErrorResponse(
            "Account doesn't exists or password isn't valid"
          );
        }
        // Generating and setting cookie
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET!
        );
        context.res.cookie("qid", token);
        return {
          data: true,
          success: true,
        };
      } catch (e) {
        console.log(e);
        return exceptionErrorResponse("error while validation credentials");
      }
    },
    checkIfTOTPMatches: async (
      _: any,
      args: checkIfTOTPMatches,
      context: Context
    ) => {
      try {
        const user = await context.prisma.user.findUnique({
          where: {
            accountNumber: args.accountNumber,
          },
        });
        if (!user || !(await argon2.verify(user?.password, args.password))) {
          return exceptionErrorResponse(
            "Account doesn't exists or password isn't valid"
          );
        }
        if (
          speakeasy.totp.verify({
            secret: "abcd",
            algorithm: "sha1",
            token: args.totpToken,
          })
        ) {
          return {
            success: true,
            data: true,
          };
        }
      } catch (e) {
        console.log(e);
        return exceptionErrorResponse("error while validating totp");
      }
    },
    changeUserPassword: async (
      _: any,
      args: { password: string; confirmPassword: string },
      context: Context
    ) => {
      try {
        if (!context.authUser.success) {
          return {
            success: false,
            errors: [
              {
                message: "Not Authenticated",
              },
            ],
          };
        }
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.authUser.data.id,
          },
        });
        if (!user) {
          return exceptionErrorResponse("No such user");
        }
        if (!user?.isExpired) {
          return exceptionErrorResponse("Already Updated");
        }
        if (!(args.password === args.confirmPassword)) {
          return exceptionErrorResponse("Password's didn't match");
        }

        const newPassword = await hash(args.password);
        if (
          await context.prisma.user.update({
            where: {
              id: context.authUser.data.id,
            },
            data: {
              password: newPassword,
              isExpired: false,
            },
          })
        ) {
          return {
            success: true,
            data: true,
          };
        }
        throw new Error("Something went wrong");
      } catch (e) {
        console.log(e);
        return exceptionErrorResponse("error while validating totp");
      }
    },

    preTransactionCheck: async (
      _: any,
      args: { recipientAccountNumber: string; amount: string },
      context: Context
    ) => {
      try {
        const findRecipient = await context.prisma.user.findUnique({
          where: {
            accountNumber: args.recipientAccountNumber,
          },
        });
        const findUser = await context.prisma.user.findUnique({
          where: {
            id: context.authUser.data.id,
          },
        });
        if (!findUser || !findRecipient) {
          return {
            errors: [{ message: "No such account" }],
            success: false,
          };
        }
        //TODO: Check whether the user is blocked or not.
        if (findUser.amount < parseInt(args.amount)) {
          return {
            errors: [{ message: "Insufficient Amount" }],
            success: false,
          };
        }
        return {
          success: true,
          data: {
            recipientInfo: {
              name: `${findRecipient.firstName} ${findRecipient.lastName}`,
              accountNumber: findRecipient.accountNumber,
              initiatedTransactionDate: moment(new Date()).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            amount: args.amount,
          },
        };
      } catch (e) {
        console.log(e);
        return exceptionErrorResponse(e);
      }
    },

    transaction: async (
      _: any,
      args: {
        recipientAccountNumber: string;
        amount: string;
        totpToken: string;
      },
      context: Context
    ) => {
      try {
        const findRecipient = await context.prisma.user.findUnique({
          where: {
            accountNumber: args.recipientAccountNumber,
          },
        });
        const findUser = await context.prisma.user.findUnique({
          where: {
            id: context.authUser.data.id,
          },
          include: {
            hardwareToken: true,
          },
        });
        if (!findUser || !findRecipient) {
          throw new Error("Cannot fetch user and recipient");
        }
        //TODO: Check whether the user is blocked or not.
        if (findUser.amount < parseInt(args.amount)) {
          throw new Error("Insufficient amount");
        }
        const userNewAmount = (findUser.amount -= parseInt(args.amount));
        const recipientNewAmount = (findRecipient.amount += parseInt(
          args.amount
        ));
        // Checking TOTP
        if (
          !speakeasy.totp.verify({
            secret: findUser.hardwareToken?.hash!,
            algorithm: "sha1",
            token: args.totpToken,
          })
        ) {
          return {
            success: false,
            errors: [
              {
                message: "Totp token mis match",
              },
            ],
          };
        }
        // Updating
        const updatedRecipient = await context.prisma.user.update({
          where: {
            id: findRecipient.id,
          },
          data: {
            amount: recipientNewAmount,
          },
        });
        const updatedUser = await context.prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            amount: userNewAmount,
          },
        });
        if (!updatedRecipient || !updatedUser) {
          throw new Error("Error while updating data");
        }
        return {
          data: {
            newAmount: updatedUser.amount.toString(),
          },
          success: true,
        };
      } catch (e) {
        console.log(e);
        return exceptionErrorResponse("something went wrong");
      }
    },
  },
};
