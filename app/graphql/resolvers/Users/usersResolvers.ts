import argon2 from "argon2";
import prismaClient from "../../../prisma/client";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import generatePassword from "../../../utils/generatePassword";
import sendMail from "../../../utils/sendMail";
import speakeasy from "speakeasy";
import { Context } from "../../context";

interface addUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  accountNumber: string;
  hardwareTokenId: string;
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
        console.log("the user is", user);
        if (!user || !(await argon2.verify(user?.password, args.password))) {
          return exceptionErrorResponse(
            "Account doesn't exists or password isn't valid"
          );
        }
        const data = speakeasy.totp.verify({
          secret: "abcd",
          algorithm: "sha1",
          token: args.totpToken,
        });
        console.log(args.totpToken);
        console.log(data);
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
            status: true,
          },
        });
        if (users) {
          console.log(users);
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
  },
  Mutation: {
    addUser: async (_: any, args: addUserArgs, context: Context) => {
      try {
        console.log("here");
        const { hardwareTokenId, ...userInfo } = args;
        //TODO: Add is active check
        const hardwareToken = await context.prisma.hardwareToken.findUnique({
          where: { tokenId: args.hardwareTokenId },
        });
        console.log("hardwareTOken", hardwareToken);
        if (!hardwareToken) {
          return exceptionErrorResponse("No such token");
        }

        const password = await generatePassword();
        console.log(password);

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
          where: { ...args },
        });
        if (!user) {
          return exceptionErrorResponse("No such account exists");
        }
        const password = await generatePassword();
        console.log(password.password);
        const updatedUser = await context.prisma.user.update({
          data: {
            status: "ACTIVE",
            password: password.hashedPassword,
            isExpired: true,
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
          success: true,
        };
      } catch (err) {
        console.log(err);
        return exceptionErrorResponse(
          "Something went wrong while registering user"
        );
      }
    },
  },
};
