"use server"

import WelcomeEmail from "@/components/Emails/welcomeEmail";
import { prismaClient } from "@/lib/db";
import { DoctorProfile } from "@prisma/client";
import { Resend } from "resend";


export async function createDoctorProfile(formData: any) {

    console.log(formData);
    const { 
        dob, 
        firstName, 
        lastName, 
        middleName, 
        gender, 
        userId, 
        trackingNumber, 
        page 
      } = formData

    const resend = new Resend(process.env.RESEND_API_KEY);


    try {

        const newProfile = await prismaClient.doctorProfile.create({
        data: {
            dob: dob as Date | undefined,
            firstName: firstName as string,
            lastName: lastName as string,
            middleName: middleName as string | undefined,
            gender: gender as string,
            userId: userId as string,
            trackingNumber: trackingNumber as string,
            page: page as string,
        },
        });
        console.log(newProfile);

        return {
          data: newProfile,
          status: 201,
          error: null
        };

    } catch (error) {
        console.log("Error creating profile:", error);
        return {
          data: null,
          status: 500,
          error: "Error response from Server"
        };
    }   
};

export async function updateDoctorProfileById(
  id: string | undefined , 
  updatedData: Partial<DoctorProfile>,
) {

  console.log("payload:",{id, updatedData});
  
    if (id && updatedData) {

      try {
        const updatedProfile = await prismaClient.doctorProfile.update({
          where:{
            id,
          },
          data: updatedData
        });
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

}

export async function getApplicationByTn(trackingNumber: string) {

  console.log("payload check:",trackingNumber);

  if (!trackingNumber) {
    console.log("No Tracking Number provided");
    return {
      data: null,
      status: 404,
      error: "Tracking Number is required"
    };
  }
  
  try {
    const resumingData = await prismaClient.doctorProfile.findUnique({
      where:{
        trackingNumber,
      }
    });

    if (!resumingData) {
      console.log("No application found for the provided tracking number:", trackingNumber);
      
      return {
        data: null,
        status: 404,
        error: "No application found with this tracking number"
      };
    }
    console.log("Resuming Data Success:", resumingData);
    
    return {
      data: resumingData,
      status: 200,
      error: null
    };

  } catch (error) {
    console.log("Error updating user:",error);
    return {
      data: null,
      status: 500,
      error: "Internal Server error occurred"
    };
  }
  
}

export async function completeProfile(
  id: string | undefined , 
  profileData: Partial<DoctorProfile>,
) {

  const resend = new Resend(process.env.RESEND_API_KEY); 

  console.log("payload:",{id, profileData});
  
    if (id && profileData) {

      try {
        const existProfile = await prismaClient.doctorProfile.findUnique({
          where:{
            id,
          },
          
        });
        console.log("Updated Profile:",existProfile);
        if (!existProfile) {
          return {
            data: null,
            status: 404,
            error: "Profile is not found"
          }
        }

        // Send a welcome email
        const firstName = existProfile.firstName;
        const email = existProfile.email as string;
        const previewText = "Welcome to Medical-Care Online";
        const message =
          "Thank you for joining Medical-Care Online, we are so grateful that we have you onboard"
        const sendMail = await resend.emails.send({
          from: "Medical App <marketing@89residencexclusive.co>",
          to: email,
          subject: "Welcome to Medical-Care Online",
          react: WelcomeEmail({ firstName, previewText, message }),
        });
        console.log("Email response:",sendMail);
        console.log(firstName);

        const updatedProfile = await prismaClient.doctorProfile.update({
          where:{
            id,
          },
          data: profileData
        });
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

}

export async function getDoctorProfileById(id: string) {

  console.log("payload check:",id);
  
  if (!id) {
    console.log("No Tracking Number provided");
    return {
      data: null,
      status: 404,
      error: "Tracking Number is required"
    };
  }
  
  try {
    const resumingData = await prismaClient.doctorProfile.findUnique({
      where:{
        id,
      }
    });

    if (!resumingData) {
      console.log("No application found for the provided tracking number:", id);
      
      return {
        data: null,
        status: 404,
        error: "No application found with this tracking number"
      };
    }
    console.log("Resuming Data Success:", resumingData);
    
    return {
      data: resumingData,
      status: 200,
      error: null
    };

  } catch (error) {
    console.log("Error updating user:",error);
    return {
      data: null,
      status: 500,
      error: "Internal Server error occurred"
    };
  }
  
}