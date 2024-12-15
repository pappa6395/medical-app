"use server"

import { prismaClient } from "@/lib/db";
import { SymptomFormProps } from "@/utils/types";
import { revalidatePath } from "next/cache";

export async function createSymptom(symptomData: SymptomFormProps) {

    console.log("Payload check:", symptomData);
    const { title, slug } = symptomData;
    
    if (symptomData) {
        try {
            const existSymptom = await prismaClient.symptom.findUnique({
                where:{
                    slug: symptomData.slug,
                }
            })
            if (existSymptom) {
                return {
                    data: null,
                    error: `Symptom with this slug ( ${slug})  already exists in the Database`,
                    status: 409,
                };
            }
            const newSymptom = await prismaClient.symptom.create({
                data: symptomData,
            });
            revalidatePath("/dashboard/symptoms")
            console.log("New Symptom:", newSymptom);
            return {
                data: newSymptom,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error creating Symptom:", error);
            return {
                data: null,
                error: "Failed to create Symptom",
                status: 500,
            };
        }
    }
    

}

export async function getSymptom() {
    
    try {

        const symptoms = await prismaClient.symptom.findMany({
            orderBy: {
                createdAt: "desc",
            }
            
        });
        return {
            data: symptoms,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error getting Symptom:", error);
        return {
            data: null,
            error: "Failed to get Symptom",
            status: 500,
        };

    }



}

export async function getSymptomBySlug(slug: string) {
    
    console.log("Payload check:", slug);
    
    try {

        if (slug) {
            const symptoms = await prismaClient.symptom.findUnique({
                where: {
                    slug,
                }
                
            });
            return {
                data: symptoms,
                status: 200,
                error: null,
    
            };
        }
        
    } catch (error) {
        console.log("Error getting symptom:", error);
        return {
            data: null,
            error: "Failed to get symptom",
            status: 500,
        };
    }
}

export async function createManySymptoms() {
    
    
        try {
            const symptoms: SymptomFormProps[] = [
                {
                    title: "Anxiety",
                    slug: "anxiety",
                },
                {
                    title: "Depression",
                    slug: "depression",
                },
                {
                    title: "Asthma",
                    slug: "asthma",
                },
                {
                    title: "Erectile Dysfunction",
                    slug: "erectile-dysfunction",
                },
                {
                    title: "Back pain",
                    slug: "back-pain",
                },
                {
                    title: "UTI",
                    slug: "UTI",
                },
                {
                    title: "Flu, cough, or cold",
                    slug: "flu-cough-or-cold",
                },
                {
                    title: "Acne",
                    slug: "acne",
                },
                {
                    title: "Tooth pain",
                    slug: "tooth-pain",
                },
                {
                    title: "Vaginal itching",
                    slug: "vaginal-inching",
                },
                {
                    title: "Itchy skin",
                    slug: "itchy-skin",
                },
                {
                    title: "Ear infection",
                    slug: "ear-infection",
                },
                {
                    title: "Sore throat",
                    slug: "sore-throat",
                },
                {
                    title: "Rash",
                    slug: "rash",
                },
                {
                    title: "Migraine",
                    slug: "migraine",
                },
                {
                    title: "Diarrhea",
                    slug: "diarrhea",
                },
                {
                    title: "Eczema",
                    slug: "eczema",
                },
                {
                    title: "Dizziness",
                    slug: "dizziness",
                },
                {
                    title: "Fever",
                    slug: "fever",
                },
                {
                    title: "Vomiting",
                    slug: "vomiting",
                },
            ]
            for (const Symptom of symptoms) {
                try {
                    await createSymptom(Symptom)


                } catch (error) {
                    console.log(`Error creating Symptom "${Symptom.title}"`,error);
                    
                }
            }
            
        } catch (error) {
            console.log("Error creating many Symptom:", error);
            return {
                data: null,
                error: "Failed to create many Symptom",
                status: 500,
            };
        }
    
    

}

export async function updateSymptom(id: string, symptomData: SymptomFormProps) {

    console.log("Payload check:", symptomData);
    
    if (id && symptomData) {
        try {
            
            const updatedSymptom = await prismaClient.symptom.update({
                where: {
                    id,
                },
                data: symptomData,
            });
            revalidatePath("/dashboard/symptoms")
            console.log("Update symptom:", updatedSymptom);
            return {
                data: updatedSymptom,
                status: 201,
                error: null,
            };
            
        } catch (error) {
            console.log("Error updating symptom:", error);
            return {
                data: null,
                error: "Failed to update symptom",
                status: 500,
            };
        }
    }
    

}

export async function deleteSymptom(id: string) {
    
    try {

        const symptoms = await prismaClient.symptom.delete({
            where: {
                id,
            }
            
        });
        revalidatePath("/dashboard/symptoms");
        return {
            ok: true,
            status: 200,
            error: null,

        };
        
    } catch (error) {
        console.log("Error deleting Symptom:", error);
        return {
            data: null,
            error: "Failed to delete Symptom",
            status: 500,
        };

    }



}