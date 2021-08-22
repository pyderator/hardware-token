import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import Dataloader from "dataloader";
import { batchHashes } from "../batches/hashLoader";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Duration: " + e.duration + "ms");
// });

interface IisAuthenticated {
  success: boolean;
  errors?: Array<{ message: string }>;
  data?: any;
}

const isAuthenticated = (req: NextApiRequest) => {
  const { qid } = req.cookies;
  if (!qid) {
    return {
      success: false,
      errors: [
        {
          message: "No token",
        },
      ],
    };
  }
  try {
    const user = jwt.verify(qid, "thisissupersecret");
    if (!user) {
      return {
        success: false,
        errors: [
          {
            message: "Invalid token",
          },
        ],
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      errors: [
        {
          message: "Something went wrong",
        },
      ],
    };
  }
};
export interface Context {
  prisma: PrismaClient;
  createHexLoader: Dataloader<unknown, string | undefined, unknown>;
  req: NextApiRequest;
  res: NextApiResponseWithCookie;
  authUser: IisAuthenticated;
}
interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: (
    name: string,
    value: string,
    options?: { expires?: string; maxAge?: string }
  ) => {};
}
export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponseWithCookie;
}): Context {
  const authUser = isAuthenticated(req);
  return {
    prisma,
    createHexLoader: new Dataloader((keys: any) => batchHashes(keys)),
    req,
    res,
    authUser,
  };
}
