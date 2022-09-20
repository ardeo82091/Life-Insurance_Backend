var nodemailer = require('nodemailer');

function marketing(req,resp)
{
    let {to,subject,text} = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ar82091@gmail.com',
            pass: 'swkxqjvemixcjvbl'
        }
    });
    
    var mailOptions = {
        from: 'ar82091@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: [{
            //filename: filename
        }]     
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            resp.status(403).send("Fail to Send the Email");
        } else {
            console.log('Email sent: ' + info.response);
            resp.status(201).send("Sent Successfully");
        }
    });
}

module.exports = {marketing};
