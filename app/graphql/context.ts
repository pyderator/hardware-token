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

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});

export interface Context {
  prisma: PrismaClient;
  createHexLoader: Dataloader<unknown, string | undefined, unknown>;
}

export function createContext(): Context {
  return {
    prisma,
    createHexLoader: new Dataloader((keys: any) => batchHashes(keys)),
  };
}
