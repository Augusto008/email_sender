import express from "express";
import { route } from "./routes";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import StandardDAO from "./dao/standardObj";
import SenderController from "./controller/senderController";

const prisma = new PrismaClient();
const actionJob = new StandardDAO();
const sender = SenderController;
const app = express();
var counter = 0;

app.use(route);

cron.schedule(' 10/* * * * * * ', async () => {
    try {
        let domains = await prisma.$queryRaw`
        select
        d.*,
        count(*) as amout_jobs
        from email_jobs ej
        inner join domains d on ej.id_domains = d.id
        where ej.status = 'pending' or ej.status = 'retry'
        group by 1`;

        await Promise.all(domains.map(async event => {
            let toSend = await prisma.email_jobs.findMany({
                where: {
                    OR: [
                        { status: "pending" },
                        { status: "retry" },
                        { status: "reviwed" },
                        { status: "fauty" }
                    ], id_domains: event.id
                },
                include: {
                    domains: true,
                    templates: true
                },
                take: 3
            })
            await Promise.all(toSend.map(async job => {
                try {
                    if (job.received_content) {
                        let content = { tmpl: job.templates, domain: job.domains, content: job.received_content };
                        let attempts = job.attempts + 1;
                        let result = await sender.emailSender(content);

                        if (!result.success && job.status === 'pending') {
                            await prisma.email_jobs.update({
                                where: { id: job.id },
                                data: {
                                    status: 'retry',
                                    attempts: attempts
                                }
                            });
                            throw result.error;
                        } else if (!result.success && event.attempts < 2) {
                            await prisma.email_jobs.update({
                                where: { id: job.id },
                                data: { attempts }
                            });
                            throw result.error;
                        } else if (!result.success) {
                            await prisma.email_jobs.update({
                                where: { id: job.id },
                                data: {
                                    is_broken: true,
                                    status: 'canceled',
                                    attempts,
                                    problems: result.message
                                }
                            });
                            throw result.error;
                        };

                        await prisma.email_jobs.update({
                            where: { id: job.id },
                            data: {
                                status: "sent",
                                attempts
                            }
                        })

                    } else {
                        await prisma.email_jobs.update({
                            where: { id: job.id },
                            data: {
                                is_broken: true,
                                status: 'canceled',
                                attempts,
                                problems: { content: "content does not exist!" }
                            }
                        })
                    }
                } catch (error) {
                    console.log({ method: "send_email", message: "Error when sending email", error: error.message });
                }
            }))
        }));
    } catch (error) {
        console.log('Erro ao enviar emails: ', error.message);
    }
});

app.listen(process.env.APP_PORT, () => { "App listening on port " + process.env.APP_PORT });