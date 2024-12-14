"use server"

import { prismaClient } from "@/lib/db";
import { SpecialtyFormProps } from "@/utils/types";
import { revalidatePath } from "next/cache";

export async function createSpecialty(specialtyData: SpecialtyFormProps) {

    console.log("Payload check:", specialtyData);
    const { title, slug } = specialtyData;
    
    if (specialtyData) {
        try {
            const existSpecialty = await prismaClient.speciality.findUnique({
                where:{
                    slug: specialtyData.slug,
                }
            })
            if (existSpecialty) {
                return {
                    data: null,
                    error: `Specialty with this slug ( ${slug})  already exists in the Database`,
                    status: 409,
                };
            }
            const newSpecialty = await prismaClient.speciality.create({
                data: specialtyData,
            });
            revalidatePath("/dashboard/specialties")
            console.log("New specialty:", newSpecialty);
            return {
                data: newSpecialty,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error creating specialty:", error);
            return {
                data: null,
                error: "Failed to create specialty",
                status: 500,
            };
        }
    }
    

}

export async function getSpecialty() {
    
    try {

        const specialties = await prismaClient.speciality.findMany({
            orderBy: {
                createdAt: "desc",
            }
            
        });
        return {
            data: specialties,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error getting specialty:", error);
        return {
            data: null,
            error: "Failed to get specialty",
            status: 500,
        };

    }



}

export async function createManySpecialties() {
    
    
        try {
            const specialties: SpecialtyFormProps[] = [
                {
                    title: "Primary care",
                    slug: "primary-care",
        
                },
                {
                    title: "Dermatology",
                    slug: "dermatology",
        
                },
                {
                    title: "Pediatrics",
                    slug: "pediatrics",
        
                },
                {
                    title: "Men's Health",
                    slug: "mens-health",
        
                },
                {
                    title: "Woman's Health",
                    slug: "womens-health",
        
                },
                {
                    title: "Dental",
                    slug: "dental",
        
                },
            ]
            for (const specialty of specialties) {
                try {
                    await createSpecialty(specialty)


                } catch (error) {
                    console.log(`Error creating specialty "${specialty.title}"`,error);
                    
                }
            }
            
        } catch (error) {
            console.log("Error creating many Specialty:", error);
            return {
                data: null,
                error: "Failed to create many Specialty",
                status: 500,
            };
        }
    
    

}

export async function deleteSpecialty(id: string) {
    
    try {

        const specialties = await prismaClient.speciality.delete({
            where: {
                id,
            }
            
        });
        revalidatePath("/dashboard/specialties");
        return {
            ok: true,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error deleting specialty:", error);
        return {
            data: null,
            error: "Failed to delete specialty",
            status: 500,
        };

    }



}