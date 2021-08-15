import prismaClient from "../../../../prisma/client";

export const checkIfTokenExists = async (id: string) => {
  const token = await prismaClient.hardwareToken.findFirst({
    where: { tokenId: id },
  });
  return token ? token : false;
};
