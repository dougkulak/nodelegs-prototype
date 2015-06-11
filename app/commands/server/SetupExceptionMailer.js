var Util = require('util');
var Command = require('../../../lib/Command');

module.exports = MyCommand;
Util.inherits(MyCommand, Command);

function MyCommand(injector) {
    Command.call(this, injector);
}

MyCommand.prototype.execute = function() {
    if (process.env.EXCEPTION_MAILER_ENABLED === "true") {

        process.on('uncaughtException', function(error) {
            function sendEmail(mailData) {
                var nodemailer = require("nodemailer");

                var smtpTransport = nodemailer.createTransport("SMTP", {
                    service: process.env.SMTP_SERVICE,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });

                smtpTransport.sendMail(mailData, function(err, response) {
                    smtpTransport.close();
                });
            }

            sendEmail({
                from: process.env.EXCEPTION_MAILER_FROM,
                to: process.env.EXCEPTION_MAILER_TO,
                subject: process.env.EXCEPTION_MAILER_SUBJECT,
                text: error.stack
            });

            console.error(error.stack);
        });
    }

    this.dispatch('SETUP_EXCEPTION_MAILER_COMPLETE');
};