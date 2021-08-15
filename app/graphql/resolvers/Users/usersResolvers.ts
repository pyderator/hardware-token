import argon2 from "argon2";
import prismaClient from "../../../prisma/client";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import generatePassword from "../../../utils/generatePassword";
import sendMail from "../../../utils/sendMail";

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

export const userResolver = {
  Mutation: {
    addUser: async (_: any, args: addUserArgs) => {
      try {
        const { hardwareTokenId, ...userInfo } = args;
        const hardwareToken = await prismaClient.hardwareToken.findUnique({
          where: { tokenId: args.hardwareTokenId },
        });

        if (!hardwareToken) {
          return exceptionErrorResponse("No such token");
        }

        const password = await generatePassword();

        const user = await prismaClient.user.create({
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
        console.log(user);
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
        return exceptionErrorResponse("Something went wrong while adding user");
      }
    },
    async registerUser(_: any, args: registerUserArgs) {
      console.log("her");
      try {
        const user = await prismaClient.user.findFirst({
          where: { ...args },
        });
        if (!user) {
          return exceptionErrorResponse("No such account exists");
        }
        const password = await generatePassword();
        console.log("oyo");
        const updatedUser = await prismaClient.user.update({
          data: {
            status: "ACTIVE",
            password: password.hashedPassword,
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
