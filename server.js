// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Replace these with your email credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use SMTP
    auth: {
      user: 'nikrajani.cms@gmail.com',
    }
  });

  const mailOptions = {
    from: email,
    to: 'nikrajani.cms@gmail.com',
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ success: false, message: 'Email failed to send' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ success: true, message: 'Email sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
