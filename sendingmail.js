require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arunaveeramallu538@gmail.com',
        pass: 'Aruna@538'
    }
});

let mailOptions = {
    from: 'arunaveeramallu538@gmail.com',
    to: 'arunanaidu1223@gmail.com',
    subject: 'testing',
    text: 'jdjccnjscnjscnjkn'
};
transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log("err", err);

    }
    else {
        console.log("mail sent");
    }
})

