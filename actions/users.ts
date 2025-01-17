"use server"

import EmailTemplate from "@/components/Emails/emailTemplate";
import { prismaClient } from "@/lib/db";
import generateSlug from "@/utils/generateSlug";
import { AdminProps, Doctor, RegisterInputProps, UserProps } from "@/utils/types";
import { User, UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache";
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
            slug: generateSlug(fullName),
            email: email,
            phone,
            password: hashedPassword || "GoogleAuthentication",
            role: role as UserRole,
            plan: pricePlan,
            token: userToken,
        },
        });
        //Send an Email with the Token on the link as a search param
        const token = newUser.token??0;
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

export async function getUsers() {

    try {

      const users = await prismaClient.user.findMany({
        orderBy: {
          createdAt: "desc",
        }
      })
      return users

    } catch (error) {
        console.log("Error get user id:", error);
        
    }
};

export async function getUserById(id:string) {

  console.log("Getting user by id:", id);
  if (id) {
    try {

      const user = await prismaClient.user.findUnique({
        where:{
          id,
        },
      })
      return user;

    } catch (error) {
        console.log("Error get user id:", error);
        
    }
  }
};

export async function updateUserProfileById(
  id: string | undefined,
  updatedData: AdminProps
) {
  
    if (id && updatedData) {

      try {
        const updatedProfile = await prismaClient.user.update({
          where:{
            id,
          },
          data: updatedData
        });
        revalidatePath("/dashboard/settings")
        console.log("Updated Profile:",updatedProfile);

        return {
          data: updatedProfile,
          status: 201,
          error: null
        };
      } catch (error) {
        console.log("Error updating user:",error);
        return {
          data: null,
          status: 500,
          error: "Error response from Server"
        };
      }
    }

};

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
};

export async function getDoctors() {
  try {
    const doctors = await prismaClient.user.findMany({
      where: {
        role: "DOCTOR"
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        doctorProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            bio: true,
            profilePicture: true,
            operationMode: true,
            hourlyWage: true,
            hospitalAddress: true,
            status: true,
            primarySpecialization: true,
            // Add other specific fields you need from the DoctorProfile
            availability: {
              select: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              }
            }
          }
        }
      },
    });
    return doctors
  } catch (error) {
    console.log("Error get Doctors:",error);
    return null;
  }
};

export async function getDoctorsBySlug(slug: string) {

  if (slug) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          slug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          email: true,
          phone: true,
          doctorProfile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              gender: true,
              bio: true,
              profilePicture: true,
              operationMode: true,
              hourlyWage: true,
              city: true,
              state: true,
              country: true,
              yearsOfExperience: true,
              medicalLicense: true,
              medicalLicenseExpiry: true,
              boardCertificates: true,
              otherSpecialties: true,
              primarySpecialization: true,
              hospitalName: true,
              hospitalAddress: true,
              hospitalContactNumber: true,
              hospitalEmailAddress: true,
              hospitalHoursOfOperation: true,
              hospitalWebsite: true,
              research: true,
              accomplishments: true,
              additionalDocuments: true,
              graduationYear: true,
              educationHistory: true,
              servicesOffered: true,
              insuranceAccepted: true,
              languagesSpoken: true,

              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                }
              }
            }
          }
        },
      });
      if (!doctor) {
        return null
      };
      return doctor
    } catch (error) {
      console.log("Error get Doctors:",error);
      return null;
    }
  }
  
};

export async function getDoctorsById(id: string) {

  if (id) {
    try {
      const doctor = await prismaClient.user.findFirst({
        where: {
          role: "DOCTOR",
          id,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          email: true,
          phone: true,
          doctorProfile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              middleName: true,
              gender: true,
              dob: true,
              bio: true,
              profilePicture: true,
              operationMode: true,
              hourlyWage: true,
              city: true,
              state: true,
              country: true,
              yearsOfExperience: true,
              medicalLicense: true,
              medicalLicenseExpiry: true,
              boardCertificates: true,
              otherSpecialties: true,
              primarySpecialization: true,
              medicalSchool: true,
              hospitalName: true,
              hospitalAddress: true,
              hospitalContactNumber: true,
              hospitalEmailAddress: true,
              hospitalHoursOfOperation: true,
              hospitalWebsite: true,
              research: true,
              accomplishments: true,
              additionalDocuments: true,
              graduationYear: true,
              educationHistory: true,
              servicesOffered: true,
              insuranceAccepted: true,
              languagesSpoken: true,
              status: true,

              // Add other specific fields you need from the DoctorProfile
              availability: {
                select: {
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true,
                }
              }
            }
          }
        },
      });
      if (!doctor) {
        return null
      };
      return doctor
    } catch (error) {
      console.log("Error get Doctors:",error);
      return null;
    }
  }
  
};