const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");
const PORT = process.env.PORT || 3000;
const app = express();

//Midddleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body);

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "lvnry2000@gmail.com",
  //       pass: "G@bby3113",
  //     },
  //   });

  const transporter = nodemailer.createTransport({
    host: "box5590.bluehost.com",
    port: 465,
    auth: {
      user: "contact@holtvillecoc.com",
      pass: "M@!1@dm!n",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "contact@holtvillecoc.com",
    subject: req.body.subject,
    message: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log(`Email sent: ` + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
