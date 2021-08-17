import prismaClient from "../../../prisma/client";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import { checkIfTokenExists } from "./utils/checkIfTokenExists";

export const hardwareTokenResolvers = {
  Query: {
    async getHardwareToken(_: any, args: any) {
      try {
        const token = await checkIfTokenExists(args.id);
        if (!token) {
          return exceptionErrorResponse("No such token");
        }
        return {
          data: token,
          success: true,
        };
      } catch (e) {
        return exceptionErrorResponse("Something went wrong");
      }
    },

    // Returns all the avaliable hardware tokens
    async getHardwareTokens() {
      try {
        const tokens = await prismaClient.hardwareToken.findMany();
        if (tokens) {
          return {
            data: tokens,
            success: true,
          };
        }
        throw new Error();
      } catch (e) {
        return exceptionErrorResponse("Something went wrong");
      }
    },
  },
  Mutation: {
    // addUser: async (parent: any, args: any, context: any, info: any) => {
    //   return true;
    // },
    addHardwareToken: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      try {
        if (await checkIfTokenExists(args.tokenId)) {
          return exceptionErrorResponse("Token already exists");
        }
        const hardWareToken = await prismaClient.hardwareToken.create({
          data: {
            tokenId: args.tokenId,
          },
        });
        if (hardWareToken) {
          return {
            data: hardWareToken,
            success: true,
          };
        } else {
          throw new Error();
        }
      } catch (e) {
        return exceptionErrorResponse("Something went wrong");
      }
    },
  },
};
