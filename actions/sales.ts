"use server"

import { prismaClient } from "@/lib/db"
import { Sale } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface SaleProps {
 appointmentId: string;
 doctorId: string;
 doctorName: string;
 patientId: string;
 patientName: string;
 totalAmount: number;
}

export async function createSale(data: SaleProps) {

    console.log("Payload Checked for Sale:", data);
    
    try {
        const sale = await prismaClient.sale.create({
            data,
        });
        revalidatePath("/dashboard/doctor/sales")
        revalidatePath("/dashboard/user/sales")
        return sale;
        
    } catch (error) {
        console.log("Error creating Sale:", error);
        
    }
}

export async function getSales() {

    try {
        const sales = await prismaClient.sale.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
        return sales;

    } catch (error) {
        console.log("Failed to get Sale:", error);
        return [];
        
    }
}

export async function getDoctorSales(doctorId: string) {

    if (doctorId) {
        try {
            const sales = await prismaClient.sale.findMany({
                where: {
                    doctorId,
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
            return sales;
    
        } catch (error) {
            console.log("Failed to get Sale:", error);
            return [];
            
        }
    }
    
}