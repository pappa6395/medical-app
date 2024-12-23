"use server"


import { prismaClient } from "@/lib/db"
import generateSlug from "@/utils/generateSlug";


export async function getDoctorsByServiceSlug(slug: string) {
    
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

export async function getDoctorsBySpecialtySlug(slug: string) {
    
    console.log("Payload check:", slug);
    
    try {
        if (slug) {
            const specialties = await prismaClient.speciality.findMany({
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
            console.log("Specialties:", specialties);
            return {
                data: specialties,
                status: 200,
                error: null,
            }
        }
        
    } catch (error) {
        console.log("Error getting speciality:", error);
        return {
            data: null,
            error: "Failed to get speciality",
            status: 500,
        }

    }
}

export async function getDoctorsBySymptomId(symptomId: string) {
    
    console.log("Payload check:", symptomId);

    if (!symptomId) {
        console.error("Invalid input: Symptom ID is required.");
        return {
            data: null,
            status: 400,
            error: "Symptom ID is required.",
        };
    }
    
    try {  
            const doctorProfiles = await prismaClient.doctorProfile.findMany({
                where: {
                    symptomIds: {
                        has: symptomId,
                    },
                },
                include: {
                    availability: true,
                }
            });
            
            console.log("Doctor symptoms:", doctorProfiles);
            return {
                data: doctorProfiles,
                status: 200,
                error: null,
            }
        
        
    } catch (error) {
        console.log("Error getting symptom:", error);
        return {
            data: null,
            error: "Failed to get symptom",
            status: 500,
        }

    }
}

export async function getOtherDoctorServicesByService(service: any) {
    
    console.log("Payload check:", service);
    
    if (!service || !service.id) {
        console.log("Invalid input: Service or ServiceId is missing");
        return {
            data: null,
            status: 400,
            error: "Invalid service input",
        }
    }

    try {
            const services = await prismaClient.service.findMany({
                where: {
                    id: {
                        not: service.id
                    }
                },
                
            });
            console.log("Other Services:", services);
            return {
                data: services,
                status: 200,
                error: null,
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

export async function getOtherDoctorSpecialtiesBySpecialty(specialty: any) {
    
    console.log("Payload check:", specialty);
    
    if (!specialty || !specialty.id) {
        console.log("Invalid input: Specialty or SpecialtyId is missing");
        return {
            data: null,
            status: 400,
            error: "Invalid specialty input",
        }
    }

    try {
            const specialties = await prismaClient.speciality.findMany({
                where: {
                    id: {
                        not: specialty.id
                    }
                },
                
            });
            console.log("Other Specialties:", specialties);
            return {
                data: specialties,
                status: 200,
                error: null,
            }
        
    } catch (error) {
        console.log("Error getting speciality:", error);
        return {
            data: null,
            error: "Failed to get speciality",
            status: 500,
        }

    }
}

export async function getOtherDoctorSymptomBySymptom(symptomId: any) {

    console.log("Payload check:", symptomId);

    if (!symptomId) {
        console.log("Invalid input: Symptom or SymptomId is missing");
        return {
            data: null,
            status: 400,
            error: "Invalid service input",
        }
    }

    try {   

            const symptoms = await prismaClient.symptom.findMany({
                where: {
                    id: {
                        notIn: symptomId,
                    }
                },

            });
            console.log("Other Symptoms:", symptoms);
            return {
                data: symptoms,
                status: 200,
                error: null,
            }
    } catch (error) {
        console.log("Error getting symptom:", error);
        return {
            data: null,
            error: "Failed to get symptom",
            status: 500,
        }
    }
}

export async function getDoctorsBySearch(query: string) {
    
    if (query) {
        const services = await prismaClient.service.findMany({
            where: {
                OR: [
                  { title: { contains: query, mode: 'insensitive'}},
                  { slug: { contains: query, mode: 'insensitive'}},
                ],
            },
            select: {
                id: true,
                title: true,
                imageUrl: true,
                slug: true,
                _count: {
                    select: {
                        doctorProfile: true,
                    }
                }
            }
        });
        const specialties = await prismaClient.speciality.findMany({
            where: {
                OR: [
                  { title: { contains: query, mode: 'insensitive'}},
                  { slug: { contains: query, mode: 'insensitive'}},
                ],
              },
        });
        const symptoms = await prismaClient.symptom.findMany({
            where: {
                OR: [
                  { title: { contains: query, mode: 'insensitive'}},
                  { slug: { contains: query, mode: 'insensitive'}},
                ],
              },
        });
        const doctorProfiles = await prismaClient.doctorProfile.findMany({
            where: {
                OR: [
                  { firstName: { contains: query, mode: 'insensitive' }},
                  { lastName: { contains: query, mode: 'insensitive' }},
                  { medicalLicense: { contains: query, mode: 'insensitive' }},
                  { primarySpecialization: { contains: query, mode: 'insensitive' }},
                  { otherSpecialties: { hasSome: [query] }},
                  { servicesOffered: { hasSome: [query] }},
                ],
            },
            include: {
                availability: true,
            },
        });
        const doctors = doctorProfiles.map((doctor) => {
                return {
                    id: doctor.userId,
                    name: `${doctor.firstName} ${doctor.lastName}`,
                    email: doctor.email??"",
                    phone: doctor.phone??"",
                    slug: generateSlug(`${doctor.firstName} ${doctor.lastName}`),
                    doctorProfile: doctor,
                }
            })
        return {
            services,
            specialties,
            symptoms,
            doctors,
        };
    }
      
}