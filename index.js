const express = require("express");
const cors = require("cors");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Hello !" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, content } = req.body;
    const mailerSend = new MailerSend({
      apiKey: process.env.API_KEY,
    });

    const sentFrom = new Sender(`hello@${process.env.DOMAIN}`, "Ewa");

    const recipients = [new Recipient(email, `${firstName} ${lastName}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Nouveau message !")
      .setHtml(`<h1>Hello there</h1><strong>${content}</strong>`)
      .setText(content);

    const result = await mailerSend.email.send(emailParams);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
