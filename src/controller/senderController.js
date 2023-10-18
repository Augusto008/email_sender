const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

export default {
    async emailSender(job) {
        try {
            const domainTitle = job.domain.name;
            const domainUrl = job.domain.url;
            const domainSender = job.domain.sender;
            const domainReplier = job.domain.replier;
            const domainContact = job.domain.contact;
            const domainFooter = job.domain.footer;
            const domainLogo = job.domain.logo;

            const userCompany = job.content.company;
            const userName = job.content.name;
            const userEmail = job.content.email;
            const userContact = job.content.contact;
            const userMessage = job.content.message;

            let template = job.tmpl.body;
            let subject = job.tmpl.subject;
            let receiver;

            if (job.tmpl.receiver === "domain") {
                receiver = domainReq = plier;
            } else if (job.tmpl.receiver === "user") {
                receiver = userEmail;
            } else if (job.tmpl.receiver === "both") {

            } else {
                return { success: false, message: "Invalid receiver!" };
            }

            const data = {
                domainTitle, domainUrl, domainSender, domainReplier, domainContact, domainFooter, domainLogo,
                userName, userEmail, userContact, userMessage, userCompany
            };

            const compiledTemplate = handlebars.compile(template);
            const renderedHTML = compiledTemplate(data);

            var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "fd4768ebbe1b10",
                    pass: "9c4a64855d616b"
                }
            });

            const mailOptions = {
                from: domainSender,
                to: receiver,
                subject,
                html: renderedHTML,
                attachments: [
                    { filename: pathLogo }
                ],
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return { success: false, message: "Error on: " + error };
                } else {
                    console.log(info);
                    return { success: true, message: "Email enviado com successo!", info: info.response };
                }
            })
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}