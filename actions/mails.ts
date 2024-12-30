"use server"

import EmailTemplate from "@/components/Emails/emailTemplate";
import { prismaClient } from "@/lib/db";
import generateSlug from "@/utils/generateSlug";
import { ComposeMailProps, RegisterInputProps } from "@/utils/types";
import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Resend } from "resend";



export async function sendEmail(mailData: ComposeMailProps) {

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("Payload check:", mailData);
    const { to, subject, message, attachments } = mailData;

    try {
        
        //Send an Email with Data
        const sendMail = await resend.emails.send({
          from: "Medical App <marketing@89residencexclusive.co>",
          to: to,
          subject: subject,
          text: message,
          attachments: attachments.map(attachment => ({
            filename: attachment.title,
            path: attachment.url,
          })),
          
        });
        console.log("Email response:",sendMail);
        return {
            data: sendMail,
            error: null,
            status: 200,
          };
    } catch (error) {
        console.log("Error creating account:", error);
        return {
            data: null,
            error: "Server error. Please try again.",
            status: 500,
          };
    }   
};