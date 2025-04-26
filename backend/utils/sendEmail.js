import { text } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async(options)=>{
    const transpoter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MALI,
            pass: process.env.SMTP_PASSWORD,
        },
    });


    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: options.email,  
        subject: options.subject,
        text: options.message,
    };
    await transpoter.sendMail(mailOption);

};