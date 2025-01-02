"use server"

import NewAppointmentEmail from "@/components/Emails/new-appointment";
import UpdatedAppointmentEmail from "@/components/Emails/updatedAppointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps } from "@/utils/types";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(data: AppointmentProps) {

    console.log("Payload check:", data);

    if (data) {

        try {
            const doctor = await prismaClient.user.findUnique({
                where: {
                    id: data.doctorId,
                }
            })
            const newAppointment = await prismaClient.appointment.create({
                data,
            });
            revalidatePath("/dashboard/doctor/appointments")
            revalidatePath("/dashboard/user/appointments")
            //console.log("New appointment:", newAppointment);

            //Send the email to the Doctor
            const doctorName = doctor?.name;
            const doctorEmail = doctor?.email?? "";
            const subject = "New appointment in your Account ";
            const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`
            const message = 
            "We hope this message finds you well. We wanted to notify you that a new appointment has been scheduled. Please check your dashboard for the details at your earliest convenience.";
            
            const sendMail = await resend.emails.send({
            from: "Medical App <marketing@89residencexclusive.co>",
            to: doctorEmail,
            subject: " New Appointment Notification Approval Needed",
            react: NewAppointmentEmail({ doctorName, link , subject, message }),
            });
            console.log("Email response:",sendMail);

            return {
                data: newAppointment,
                status: 201,
                error: null,
            }
            
        } catch (error) {
            console.log("Error creating appointment:", error);
            return {
                data: null,
                error: "Failed to create appointment!",
                status: 500,
            };
        }
    }
    

};

export async function updateAppointment(id: string, data: AppointmentProps) {

    //console.log("Payload check:", data);
    
    if (id && data) {
        try {
            
            const updatedAppointment = await prismaClient.appointment.update({
                where: {
                    id,
                },
                data,
            });
            revalidatePath("/dashboard/doctors/appointments")
            revalidatePath("/dashboard/user/settings")
            //console.log("Update appointment:", updatedAppointment);
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
    

};

export async function updateAppointmentById(id: string, data: Partial<AppointmentProps>) {

    //console.log("Payload check ID:", id);
    //console.log("Payload check:", data);
    
    if (id && data) {

        try {
            const updatedAppointment = await prismaClient.appointment.update({
                where: {
                    id,
                },
                data,
            });
            revalidatePath("/dashboard/doctor/appointments")
            revalidatePath("/dashboard/user/appointments")
            //console.log("Update appointment:", updatedAppointment);

            //Send the email to the Doctor
            const patientId = updatedAppointment?.patientId??""
            const patient = await prismaClient.user.findUnique({
                where: {
                    id: patientId,
                }
            })
            const patientName = patient?.name;
            const patientEmail = patient?.email?? "";
            const subject = "An Updated Appointment Notification";
            const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`
            const message = 
            "We hope this message finds you well. We wanted to notify you that an updated appointment has been scheduled. Please check your dashboard for the details at your earliest convenience.";
            
            const sendMail = await resend.emails.send({
            from: "Medical App <marketing@89residencexclusive.co>",
            to: patientEmail,
            subject: subject,
            react: UpdatedAppointmentEmail({ patientName, link , subject, message }),
            });
            console.log("Email response:",sendMail);

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
    

};

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
};

export async function getAppointmentById(id: string) {
    
    //console.log("Payload check:", id);
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
};

export async function getAppointmentByDoctorId(doctorId: string) {
    
    //console.log("Payload check:", doctorId);
    try {

        if (doctorId) {
            const appointment = await prismaClient.appointment.findMany({
                where: {
                    doctorId: doctorId,
                },
                orderBy: {
                    createdAt: "desc",
                }
                
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
};

export async function getAppointmentSaleByDoctorId(doctorId: string) {
    
    //console.log("Payload check:", doctorId);
    try {

        if (doctorId) {
            const appointment = await prismaClient.appointment.findMany({
                where: {
                    doctorId: doctorId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    transactionId: true,
                    paidAmount: true,
                    paymentStatus: true,
                    paymentMethod: true,
                    createdAt: true,
                    sale: {
                        select: {
                            appointmentId: true,
                            doctorId: true,
                            patientId: true,
                            totalAmount: true,
                            doctorName: true,
                            patientName: true,
                        }

                    }
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
};

export async function getAppointmentByPatientId(patientId: string) {
    
    //console.log("Payload check:", patientId);
    try {

        if (patientId) {
            const appointment = await prismaClient.appointment.findMany({
                where: {
                    patientId: patientId,
                },
                orderBy: {
                    createdAt: "desc",
                }
                
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
};

export async function getAppointmentByPatientIdAndDoctorId(patientId: string, doctorId: string) {
    
    //console.log("Payload check patient ID:", patientId);
    //console.log("Payload check doctor ID:", doctorId);
    try {

        if (patientId) {
            const appointment = await prismaClient.appointment.findMany({
                where: {
                    patientId: patientId,
                    doctorId: doctorId,
                },
                orderBy: {
                    createdAt: "desc",
                }
                
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
};


export async function getRecentAppointmentByPatientId(patientId: string | undefined) {
    
    //console.log("Payload check:", patientId);
    try {

        if (patientId) {
            const appointment = await prismaClient.appointment.findFirst({
                where: {
                    patientId: patientId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
                
            });
            if (!appointment) {
                return {
                    data: null,
                    status: 404,
                    error: "No appointment found!",
                };
            }
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
};

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



};