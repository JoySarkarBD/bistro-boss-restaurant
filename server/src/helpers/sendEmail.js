const nodemailer = require("nodemailer");

const sendEmail = async (mailInfo) => {
    const {receivers, emailSubject, emailText} = mailInfo
    const receiver = receivers.join(', ');

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: `${process.env.NODE_MAILER_EMAIL}`,
        port: 25,
        secure: false, // true for 465, false for other ports
        service: "gmail",
        auth: {
            user: `${process.env.NODE_MAILER_EMAIL}`,
            pass: `${process.env.NODE_MAILER_EMAIL_PASSWORD}`,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    //  mail options
    const mailOptions = {
        from: `"Bistro-Boss👻" <info@${process.env.NODE_MAILER_EMAIL}>`, // sender address
        to: receiver, // list of receivers
        subject: emailSubject, // Subject line
        html: emailText, // plain text body
    };

    return await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;