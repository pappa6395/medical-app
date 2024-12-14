"use server"

import EmailTemplate from "@/components/Emails/emailTemplate";
import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "@/utils/types";
import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Resend } from "resend";



export async function createUser(submittedData: RegisterInputProps) {

    console.log(submittedData);
    const { fullName, email, phone, password, role, plan} = submittedData

    const inputPlan: string | string[] | undefined = plan;
    const pricePlan: string | null | undefined = Array.isArray(inputPlan) 
    ? inputPlan[0] : inputPlan;

    const resend = new Resend(process.env.RESEND_API_KEY);
    

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
            role: role as UserRole,
            plan: pricePlan,
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
          from: "Medical App <marketing@89residencexclusive.co>",
          to: email,
          subject: "Verify Your Email Address",
          react: EmailTemplate({ firstName, token, linkText, message }),
        });
        console.log(token);
        console.log("Email response:",sendMail);
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

  console.log("Getting user by id:", id);
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