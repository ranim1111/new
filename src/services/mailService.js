var http = require('http');
var nodemailer = require('nodemailer');
const userModel = require('../models/user.model')

 
 function mailServices(email){
 try {
   
 
  
  var fromEmail = 'ltconlineschool@gmail.com';
  var toEmail = email;

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    
      auth: {
        user: 'ltconlineschool@gmail.com',
        pass: 'fastandfurious'
      }
  });
   transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Regarding forget password request',
      text: 'This is forget password response from your app',
      html: '<p>Your password is <b>sample</b></p>'
  },
);
} catch (error) {
   
}
}


module.exports = mailServices
