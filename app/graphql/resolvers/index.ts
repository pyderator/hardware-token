import prismaClient from "../../prisma/client";
import { exceptionErrorResponse } from "../../utils/exceptionErrorResponse";
import { hardwareTokenResolvers } from "./HardwareToken/hardwareTokenResolvers";
import { checkIfTokenExists } from "./HardwareToken/utils/checkIfTokenExists";
import { userResolver } from "./Users/usersResolvers";

export const resolvers = [hardwareTokenResolvers, userResolver];
