var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmednagh2005@gmail.com",
    pass: "sjss xtnm hrji rlap",
  },
});
function sendEmail(to,subject,message){
  //if you want to use the email for testing you can comment the return 
  // better option is to log the message in the log for ONLY TESTING!
  return;
    var mailOptions = {
        from: "ahmednagh2005@gmail.com",
        to: to,
        subject: subject,
        text: message,
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
}



module.exports = sendEmail;