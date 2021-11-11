
const nodemailer = require("nodemailer");
const pug = require('pug');

class MailService {
    static async SendMail(email='') {
        let transporter = this.createTransport();
        var htmlPug = this.compilePug(email);
        await transporter.sendMail({
            from: '"Fakebook Mailer" <corine.langosh91@ethereal.email>',
            to: email,
            subject: "Reset account password ✔",
            html: htmlPug,
        });
    }

    static createTransport(){
        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'corine.langosh91@ethereal.email',
                pass: '3hxG1U2bEjSAQmhxnv',
            },
        });
    }

    static compilePug(email){
        var fn = pug.compileFile('./Views/resetPasswordMailForm.pug');
        return fn({ url: process.env.CLIENT_URL, resetUrl : email});
    }
}

module.exports = MailService;