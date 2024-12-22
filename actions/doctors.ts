"use server"

import { prismaClient } from "@/lib/db";
import { Doctor } from "@/utils/types";


export async function getDoctorsBySlug(slug: string) {
    
    console.log("Payload check:", slug);
    
    try {
        if (slug) {
            const services = await prismaClient.service.findMany({
                where: {
                    slug,
                },
                include: {
                    doctorProfile: {
                        include: {
                            availability: true,
                        }
                    }
                }
                
            });
            console.log("Services:", services);
            return {
                data: services,
                status: 200,
                error: null,
            }
        }
        
    } catch (error) {
        console.log("Error getting service:", error);
        return {
            data: null,
            error: "Failed to get service",
            status: 500,
        }

    }
}
