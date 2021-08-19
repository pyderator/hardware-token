import argon2 from "argon2";
import { createHexArray } from "../../../utils/createHexArray";
import { exceptionErrorResponse } from "../../../utils/exceptionErrorResponse";
import { Context } from "../../context";
import { checkIfTokenExists } from "./utils/checkIfTokenExists";

export const hardwareTokenResolvers = {
  Query: {
    async getHardwareToken(_: any, args: any, context: Context) {
      try {
        const token = await checkIfTokenExists(args.productKey);
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

    // Returns all  hardware tokens
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

    // Return all avaliable hardware tokens
    async getHardwareTokensUnAssigned(_: any, __: any, context: Context) {
      try {
        const tokens = await context.prisma.hardwareToken.findMany({
          where: {
            User: null,
          },
        });

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
        console.log(process.env.SECRET_KEY);
        const hash = await argon2.hash(
          args.productKey + process.env.SECRET_KEY
        );
        const hashArray = createHexArray(hash);

        const hardWareToken = await context.prisma.hardwareToken.create({
          data: {
            productKey: args.productKey,
            hash,
          },
        });

        if (hardWareToken) {
          return {
            data: { ...hardWareToken, hashArray },
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
