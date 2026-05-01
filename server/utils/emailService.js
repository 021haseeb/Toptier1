const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

exports.sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `TopTier Properties <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text: text || html.replace(/<[^\u003e]*>/g, '')
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
  return info;
};

