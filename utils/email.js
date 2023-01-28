const { createTransport } = require("nodemailer");

const sendEmail = async (options) => {
  // Create transporter
  const transporter = createTransport({
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  });

  // Define the mail options

  const mailOptions = {
    from: "Dang Van Hien <hello@jonas.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: ''
  };

  // actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
