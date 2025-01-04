import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { CalendarDays, DollarSign, LayoutGrid, Mail, Plus, Users, UsersRound } from "lucide-react";
import { getServerSession } from "next-auth";
import { getAppointmentByDoctorId, getAppointmentByPatientId, getAppointments } from "./appointments";
import { getInboxMessages } from "./inbox";
import { UserRole } from "@prisma/client";
import { getDoctors } from "./users";
import { getService } from "./services";
import { getDoctorSales } from "./sales";

export async function getStats() {
    
        try {

            const serviceCount = await prismaClient.service.count();
            const doctorCount = await prismaClient.doctorProfile.count();
            const stats = {
                doctors: doctorCount.toString().padStart(2,'0'),
                patients: "00",
                appointments: "00",
                services: serviceCount.toString().padStart(2,'0'),

            };
            return stats
            
        } catch (error) {
            console.log("Error getting service:", error);
            return {
                doctors: null,
                patients: null,
                appointments: null,
                services: null,
            };
        }
};

export async function getAdminAnalytics() {
    
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user
        const userId = user?.id??""
        const appointments = (await getAppointments())?.data || []
        const doctors = await getDoctors() || []
        
        const uniquePatientsMap = new Map();

        appointments?.forEach((app) => {
            if (!uniquePatientsMap.has(app.patientId)) {
            uniquePatientsMap.set(app.patientId, {
                patientId : app.patientId ?? "",
                name: `${app.firstName ?? ''} ${app.lastName ?? ''}`,
                email: app.email ?? '',
                phone: app.phone ?? '',
                location: app.location ?? '',
                gender: app.gender ?? '',
                occupation: app.occupation ?? '',
                dob: app.dob ?? new Date(),
            });
            }
        });
      
        const patients = Array.from(uniquePatientsMap.values() || [])
        const messages = (await getInboxMessages(userId))?.data || [];
        const services = (await getService())?.data || [];

        const analytics = [
            {
                title: "Doctors",
                count: doctors.length ?? 0,
                icon: Users,
                unit: Plus,
                detailLink: "/dashboard/doctors"
            },
            {
                title: "Patients",
                count: patients.length ?? 0,
                icon: UsersRound,
                unit: Plus,
                detailLink: "/dashboard/patients"
            },
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: CalendarDays,
                unit: Plus,
                detailLink: "/dashboard/appointments"
            },
            {
                title: "Services",
                count: services.length ?? 0,
                icon: LayoutGrid,
                unit: Plus,
                detailLink: "/dashboard/services"
            },
        ]

        return analytics 
        
    } catch (error) {
        console.log("Error getting service:", error);
        return []
    }
};

export async function getDoctorAnalytics() {
    
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user
        const userId = user?.id??""
        const appointments = (await getAppointmentByDoctorId(userId))?.data || []
        
        const uniquePatientsMap = new Map();

        appointments.forEach((app) => {
            if (!uniquePatientsMap.has(app.patientId)) {
            uniquePatientsMap.set(app.patientId, {
                patientId : app.patientId,
                name: `${app.firstName} ${app.lastName}`,
                email: app.email,
                phone: app.phone,
                location: app.location,
                gender: app.gender,
                occupation: app.occupation,
                dob: app.dob,
            });
            }
        });
      
        const patients = Array.from(uniquePatientsMap.values())
        const messages = (await getInboxMessages(userId))?.data || [];
        const sales = await getDoctorSales(userId)

        const analytics = [
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: CalendarDays,
                unit: Plus,
                detailLink: "/dashboard/doctor/appointments"
            },
            {
                title: "Patients",
                count: patients.length ?? 0,
                icon: UsersRound,
                unit: Plus,
                detailLink: "/dashboard/doctor/patients"
            },
            {
                title: "Inbox",
                count: messages.length ?? 0,
                icon: Mail,
                unit: Plus,
                detailLink: "/dashboard/doctor/inbox"
            },
            {
                title: "Sales",
                count: sales?.length ?? 0,
                icon: DollarSign,
                unit: Plus,
                detailLink: "/dashboard/doctor/sales"
            },
        ]

        return analytics
        
    } catch (error) {
        console.log("Error getting service:", error);
        return []
    }
};

export async function getUserAnalytics() {
    
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user
        const userId = user?.id??""
        const appointments = (await getAppointmentByPatientId(userId))?.data || []
        
        const uniquePatientsMap = new Map();

        appointments.forEach((app) => {
            if (!uniquePatientsMap.has(app.doctorId)) {
            uniquePatientsMap.set(app.doctorId, {
                doctorId : app.doctorId,
                name: app.doctorName,
            });
            }
        });
      
        const doctors = Array.from(uniquePatientsMap.values())
        const messages = (await getInboxMessages(userId))?.data || [];

        const analytics = [
            {
                title: "Appointments",
                count: appointments.length ?? 0,
                icon: CalendarDays,
                unit: Plus,
                detailLink: "/dashboard/user/appointments"
            },
            {
                title: "Doctors",
                count: doctors.length ?? 0,
                icon: UsersRound,
                unit: Plus,
                detailLink: "/dashboard/user/patients"
            },
            {
                title: "Inbox",
                count: messages.length ?? 0,
                icon: Mail,
                unit: Plus,
                detailLink: "/dashboard/user/inbox"
            },
        ]

        return analytics
        
    } catch (error) {
        console.log("Error getting service:", error);
        return []
    }
};