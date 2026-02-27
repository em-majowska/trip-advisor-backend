const express = require("express");
const cors = require("cors");
const { MailerSend, EmailParams, Sender, Recipiet } = require("mailersend");
const app = express.app();

require("dotenv").config();
