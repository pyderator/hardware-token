import { NextApiRequest } from "next";

export const isAuthenticated = (req: NextApiRequest) => {
  const { qid } = req.cookies;
};
