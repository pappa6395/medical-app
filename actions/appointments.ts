"use server"

import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceFormProps, UpdateAppointmentFormProps } from "@/utils/types";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: AppointmentProps) {

    console.log("Payload checke:", data);
    
    if (data) {
        try {
            const newAppointment = await prismaClient.appointment.create({
                data,
            });
            revalidatePath("/dashboard/doctor/appointments")
            console.log("New appointment:", newAppointment);
            return {
                data: newAppointment,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error creating appointment:", error);
            return {
                data: null,
                error: "Failed to create appointment!",
                status: 500,
            };
        }
    }
    

}

export async function updateAppointment(id: string, data: AppointmentProps) {

    console.log("Payload check:", data);
    
    if (id && data) {
        try {
            
            const updatedAppointment = await prismaClient.appointment.update({
                where: {
                    id,
                },
                data,
            });
            revalidatePath("/dashboard/doctors/appointments")
            console.log("Update appointment:", updatedAppointment);
            return {
                data: updatedAppointment,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error updating appointment:", error);
            return {
                data: null,
                error: "Failed to update appointment!",
                status: 500,
            };
        }
    }
    

}

export async function updateAppointmentById(id: string, data: Partial<AppointmentProps>) {

    console.log("Payload check ID:", id);
    console.log("Payload check:", data);
    
    if (id && data) {

        try {
            const updatedAppointment = await prismaClient.appointment.update({
                where: {
                    id,
                },
                data,
            });
            revalidatePath("/dashboard/doctors/appointments")
            console.log("Update appointment:", updatedAppointment);
            return {
                data: updatedAppointment,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error updating appointment:", error);
            return {
                data: null,
                error: "Failed to update appointment!",
                status: 500,
            };
        }
    }
    

}

export async function getAppointments() {
    
        try {

            const appointments = await prismaClient.appointment.findMany({
                orderBy: {
                    createdAt: "desc",
                }
                
            });
            return {
                data: appointments?? null,
                status: 200,
                error: null,
            };
            
        } catch (error) {
            console.log("Error getting appointments:", error);
            return {
                data: null,
                error: "Failed to get appointments",
                status: 500,
            };

        }
}

export async function getAppointmentById(id: string) {
    
    console.log("Payload check:", id);
    try {

        if (id) {
            const appointment = await prismaClient.appointment.findUnique({
                where: {
                    id,
                }
                
            });
            return {
                data: appointment as Appointment,
                status: 200,
                error: null,
    
            };
        }
          
    } catch (error) {
        console.log("Error getting appointment:", error);
        return {
            data: null,
            error: "Failed to get appointment!",
            status: 500,
        };
    }
}

export async function getAppointmentByDoctorId(doctorId: string) {
    
    console.log("Payload check:", doctorId);
    try {

        if (doctorId) {
            const appointment = await prismaClient.appointment.findMany({
                where: {
                    doctorId: doctorId,
                },
                
            });
            return {
                data: appointment,
                status: 200,
                error: null,
    
            };
        }
        
    } catch (error) {
        console.log("Error getting appointment:", error);
        return {
            data: null,
            error: "Failed to get appointment!",
            status: 500,
        };
    }
}

export async function deleteAppointment(id: string) {
    
    try {

        const appointment = await prismaClient.appointment.delete({
            where: {
                id,
            }
            
        });
        revalidatePath("/dashboard/doctor/appointments");
        return {
            ok: true,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error deleting appointment:", error);
        return {
            data: null,
            error: "Failed to delete appointment",
            status: 500,
        };

    }



}