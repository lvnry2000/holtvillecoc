

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(transporter: {
	host: "box5590.bluehost.com",
	port: 465,
	secure: true,
	auth: {
		user: "contact@holtvillecoc.com",
		pass: "M@!1@dm!n"
	}
});

const mailOptions = {
    from: req.body.emailAddress,
    to: "contact@holtvillecoc.com",
    subject: "Contact Submission",
    text: req.body.message,
  };
  
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log(`Email sent: ` + info.response);
      console.log(mailOptions);
      res.send("success");
    }
  });