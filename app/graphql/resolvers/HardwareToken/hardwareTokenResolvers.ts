import { useContext } from "react";
import prismaClient from "../../../prisma/client";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import { Context } from "../../context";
import { checkIfTokenExists } from "./utils/checkIfTokenExists";

export const hardwareTokenResolvers = {
  Query: {
    async getHardwareToken(_: any, args: any, context: Context) {
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
    async getHardwareTokens(_: any, __: any, context: Context) {
      try {
        const tokens = await context.prisma.hardwareToken.findMany();
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
      context: Context,
      info: any
    ) => {
      try {
        if (await checkIfTokenExists(args.productKey)) {
          return exceptionErrorResponse("Token already exists");
        }
        const hardWareToken = await context.prisma.hardwareToken.create({
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
