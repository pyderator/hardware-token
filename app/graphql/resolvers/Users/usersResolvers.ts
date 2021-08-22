import argon2 from "argon2";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import generatePassword from "../../../utils/generatePassword";
import sendMail from "../../../utils/sendMail";
import { Context } from "../../context";

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
          data: { id: user.id, isPasswordExpired: user.isExpired },
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
  },
  Mutation: {
    addUser: async (_: any, args: addUserArgs, context: Context) => {
      try {
        console.log("here");
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
        sendMail({
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
  },
};
