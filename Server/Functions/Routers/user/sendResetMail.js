const MailService = require('@services/MailService');

function reset(req, res) {
    const email = req.body.email;
    MailService.SendMail(email);
    res.send('ok');
}

module.exports = reset;