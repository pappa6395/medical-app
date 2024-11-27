"use server"


import EmailTemplate from "@/components/Emails/emailTemplate";
import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "@/utils/types";
import bcrypt from 'bcrypt';
import { Resend } from "resend";
import { log } from "util";

export async function createUser(submittedData: RegisterInputProps) {

    console.log(submittedData);
    const { fullName, email, phone, password, role } = submittedData

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(process.env.RESEND_API_KEY);
    
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
              email,
            },
          });
          if (existingUser) {
            return {
              data: null,
              error: `User with this email ( ${email})  already exists in the Database`,
              status: 409,
            };
          }
          const hashedPassword = await bcrypt.hash(password, 10);
        //Generate Token
        const generateToken = () => {
        const min = 100000; // Minimum 6-figure number
        const max = 999999; // Maximum 6-figure number

        return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();
        console.log("Generated token:", userToken);

        const newUser = await prismaClient.user.create({
        data: {
            name: fullName,
            email,
            phone,
            password: hashedPassword,
            role,
            token: userToken,
        },
        });
        //Send an Email with the Token on the link as a search param
        const token = newUser.token;
        const userId = newUser.id;
        const firstName = newUser.name.split(" ")[0];
        const linkText = "Verify your Account ";
        const message =
          "Thank you for registering with Medical-HC. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
        const sendMail = await resend.emails.send({
          from: "Medical App <info@jazzafricaadventures.com>",
          to: email,
          subject: "Verify Your Email Address",
          react: EmailTemplate({ firstName, token, linkText, message }),
        });
        console.log(token);
        console.log(sendMail);
        console.log(newUser);
        return {
            data: newUser,
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

export async function getUserById(id:string) {

  if (id) {
    try {

      const user = await prismaClient.user.findUnique({
        where:{
          id,
        }
      })
      return user

    } catch (error) {
        console.log("Error get user id:", error);
        
    }
  }
}

export async function updateUserById(id:string) {
  if (id) {
    try {
      const updatedUser = await prismaClient.user.update({
        where:{
          id,
        },
        data:{
          isVerfied: true,
        }
      });
      return updatedUser;

    } catch (error) {
      console.log("Error updating user:",error);
      
    }
  }
}