import nodemailer from "nodemailer";
import { google } from "googleapis";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async ({
  to,
  username,
  password,
}: {
  to: string;
  username: string;
  password: string;
}) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    } as any,
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Gaurav Jha 👻" <foo@example.com>', // sender address
    to,
    subject: "Finish registering your account", // Subject line
    html: `
    <h1>Your username is ${username}</h1>
    <h1>Your password is ${password}</h1>
    `,
  });

  console.log(info.response);

  console.log("Message sent: %s", info.messageId);
};

export default sendMail;
