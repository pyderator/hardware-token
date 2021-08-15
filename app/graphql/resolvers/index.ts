import prismaClient from "../../prisma/client";
import { exceptionErrorResponse } from "../../utils/exceptionErrorResponse";
import { hardwareTokenResolvers } from "./HardwareToken/hardwareTokenResolvers";
import { checkIfTokenExists } from "./HardwareToken/utils/checkIfTokenExists";

export const resolvers = [hardwareTokenResolvers];
