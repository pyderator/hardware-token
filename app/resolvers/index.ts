import prisma from "../prisma/client";

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await prisma.user.findMany();
        return users;
      } catch (e) {
        throw e;
      }
    },
    getUser: async (_: any, args: any) => {
      try {
        const user = await prisma.user.findFirst({
          where: { id: args.id },
        });
      } catch (e) {
        throw e;
      }
    },
  },
};
