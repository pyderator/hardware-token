import nodemailer from "nodemailer";
import { google } from "googleapis";
import AWS from "aws-sdk";

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
  try {
    const smtpEndpoint = process.env.AWS_STMP_ENDPOINT;

    const port = 587;

    const senderAddress = process.env.SENDER_ADDRESS;

    var toAddresses = to;

    const smtpUsername = process.env.AWS_SES_USERNAME;

    const smtpPassword = process.env.AWS_SES_PASSWORD;

    var subject = "Username and Password";

    var body_text = `Amazon SES Test (Nodemailer)
                  ---------------------------------
                  This email was sent through the Amazon SES SMTP interface using Nodemailer.
                  `;

    // The body of the email for recipients whose email clients support HTML content.
    var body_html = `<html>
                  <head></head>
                  <body>
                    <h1>Here are your credentials</h1>
                    <p>Username: ${username}</p>
                    <p>Password: ${password}</p>
                  </body>
                  </html>`;

    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    let mailOptions = {
      from: senderAddress,
      to: toAddresses,
      subject: subject,
      text: body_text,
      html: body_html,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log(info);

    console.log(info.response);

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
