"use server"

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
            dob: dob as string | undefined,
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