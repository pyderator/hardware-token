import jwt from "jsonwebtoken";

const verifyToken = (token: string) => {
  var decoded = jwt.verify(token, process.env.JWT_SECRET!);
};

export default verifyToken;
