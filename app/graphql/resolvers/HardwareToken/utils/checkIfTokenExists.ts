import prismaClient from "../../../../prisma/client";

export const checkIfTokenExists = async (productKey: string) => {
  const token = await prismaClient.hardwareToken.findFirst({
    where: { productKey },
  });
  return token ? token : false;
};
