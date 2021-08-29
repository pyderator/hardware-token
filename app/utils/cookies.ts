import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
const cookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: { expires?: string; maxAge?: string } = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + (options.maxAge as any)) as any;
    (options.maxAge as any) /= 1000 as any;
  }

  res.setHeader(
    "Set-Cookie",
    serialize(name, String(stringValue), options as any)
  );
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler: any) => (req: NextApiRequest, res: any) => {
  res.cookie = (
    name: string,
    value: string,
    options: { expires?: string; maxAge?: string } = {}
  ) => cookie(res, name, value, options);

  return handler(req, res);
};

export default cookies;
