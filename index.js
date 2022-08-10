"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer"); 

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/ministries", function (req, res) {
  res.render("ministries");
});

app.get("/calendar", function (req, res) {
  res.render("calendar");
});

app.get("/location", function (req, res) {
  res.render("location");
});

app.get("/prayer-request", function (req, res) {
  res.render("prayer-request");
});

app.get("/donations", function (req, res) {
  res.render("donations");
});

app.post("/", function (req, res) {
  //     const post = {
  //       title: req.body.messageTitle,
  //       message: req.body.messagePost,
  const output = `
  <h1>You Have A New Contact Request</h1>
  <h3>Contact Details</h3>
  <ul>
    <li> Name: ${req.body.fullName}</li>
    <li> Email: ${req.body.emailAddress}</li>
  </ul>
  <h3>Message</h3>
  <p> Message ${req.body.message}</p>`

  const transporter = nodemailer.createTransport({
    host: "box5590.bluehost.com",
    port: 465,
    auth: {
      user: "contact@holtvillecoc.com",
      pass: "M@!1@dm!n"
    }
  });

  const mailOptions = {
    from: req.body.emailAddress,
    to: "contact@holtvillecoc.com",
    subject: "Contact Submission",
    // text: req.body.message,
    html: output
  };
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } 
      req.body.fullName = "";
      req.body.emailAddress = "";
      req.body.message = "";
      res.render("index");
  });
      });

app.post("/prayer-request", function (req, res) {
  //     const post = {
  //       title: req.body.messageTitle,
  //       message: req.body.messagePost,
  const output = `
  <h1>You Have A New Prayer Request</h1>
  <h3>Prayer Details</h3>
  <ul>
    <li> First Name: ${req.body.fname}</li>
    <li> Last Name: ${req.body.lname}</li>
    <li> Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p> Message ${req.body.message}</p>`

  const transporter = nodemailer.createTransport({
    host: "box5590.bluehost.com",
    port: 465,
    auth: {
      user: "contact@holtvillecoc.com",
      pass: "M@!1@dm!n"
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: "contact@holtvillecoc.com",
    subject: "Prayer Submission",
    // text: req.body.message,
    html: output
  };
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } 
      req.body.fname = "";
      req.body.lname = "";
      req.body.email = "";
      req.body.message = "";
      res.render("prayer-request");
  });
      });

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
