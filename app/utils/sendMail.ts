import nodemailer from "nodemailer";

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
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USERNAME, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
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
