"use server"

import { prismaClient } from "@/lib/db";
import { ServiceFormProps } from "@/utils/types";
import { revalidatePath } from "next/cache";

export async function createService(serviceData: ServiceFormProps) {

    console.log("Payload checke:", serviceData);
    const { title, imageUrl, slug } = serviceData;
    
    if (serviceData) {
        try {
            const existService = await prismaClient.service.findUnique({
                where:{
                    slug: serviceData.slug,
                }
            })
            if (existService) {
                return {
                    data: null,
                    error: `Service with this slug ( ${slug})  already exists in the Database`,
                    status: 409,
                };
            }
            const updatedService = await prismaClient.service.create({
                data: serviceData,
            });
            revalidatePath("/dashboard/services")
            //console.log("New service:", updatedService);
            return {
                data: updatedService,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error creating service:", error);
            return {
                data: null,
                error: "Failed to create service",
                status: 500,
            };
        }
    }
    

};

export async function updateService(id: string, serviceData: ServiceFormProps) {

    console.log("Payload check:", serviceData);
    
    if (id && serviceData) {
        try {
            
            const updatedService = await prismaClient.service.update({
                where: {
                    id,
                },
                data: serviceData,
            });
            revalidatePath("/dashboard/services")
            //console.log("Update service:", updatedService);
            return {
                data: updatedService,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error updating service:", error);
            return {
                data: null,
                error: "Failed to update service",
                status: 500,
            };
        }
    }
    

};

export async function getService() {
    
        try {

            const services = await prismaClient.service.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    title: true,
                    imageUrl: true,
                    slug: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            doctorProfile: true
                        }
                    }
                }
                
            });
            return {
                data: services,
                status: 200,
                error: null,

            };
            
        } catch (error) {
            console.log("Error getting service:", error);
            return {
                data: null,
                error: "Failed to get service",
                status: 500,
            };

        }
    
    

};

export async function getServiceBySlug(slug: string) {
    
    console.log("Payload check:", slug);
    
    try {

        if (slug) {
            const services = await prismaClient.service.findUnique({
                where: {
                    slug,
                }
                
            });
            return {
                data: services,
                status: 200,
                error: null,
    
            };
        }
        
        
    } catch (error) {
        console.log("Error getting service:", error);
        return {
            data: null,
            error: "Failed to get service",
            status: 500,
        };
    }
};

export async function createManyServices() {
    
    
        try {
            const services: ServiceFormProps[] = [
                {
                    title: "Telehealth",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u8YX3tGrQrAj3Fga6uTkLSn5PwOeKGycf4xCX9",
                    slug: "telehealth",
        
                },
                {
                    title: "Video Prescription",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u8vNdUOoKDtoHKB7AcPeE4GOxr3JpC5ZwksSWI",
                    slug: "video-prescription",
        
                },
                {
                    title: "UTI Consult",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u8AYyvEZ1HwALOBz94M6ITjN0V8msKvlqZnW2o",
                    slug: "uti-consult",
        
                },
                {
                    title: "Mental Health",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u82E9yiquwLiCkectfDQ4BR3EYbFMlZKnJrjqv",
                    slug: "mental-health",
        
                },
                {
                    title: "ED Consult",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u8T9kdIDM7rnv0ZPlEibMedpa1YNmOV3XsDzkB",
                    slug: "ed-consult",
        
                },
                {
                    title: "Urgent Care",
                    imageUrl: "https://utfs.io/f/nZhGQ10Fr4u82O7h38uwLiCkectfDQ4BR3EYbFMlZKnJrjqv",
                    slug: "urgent-care",
        
                },
            ]
            for (const service of services) {
                try {
                    await createService(service)


                } catch (error) {
                    console.log(`Error creating service "${service.title}"`,error);
                    
                }
            }
            
        } catch (error) {
            console.log("Error creating many services:", error);
            return {
                data: null,
                error: "Failed to create many services",
                status: 500,
            };
        }
    
    

};

export async function deleteService(id: string) {
    
    try {

        const services = await prismaClient.service.delete({
            where: {
                id,
            }
            
        });
        revalidatePath("/dashboard/services");
        return {
            ok: true,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error deleting service:", error);
        return {
            data: null,
            error: "Failed to delete service",
            status: 500,
        };

    }



};