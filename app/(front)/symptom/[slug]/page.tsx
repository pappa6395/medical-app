import { PageProps } from '@/.next/types/app/(front)/service/[slug]/page'
import { getDoctorsBySymptomId, getOtherDoctorSymptomBySymptom } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import generateSlug from '@/utils/generateSlug'
import Link from 'next/link'
import React from 'react'



const page = async ({
    params: paramsPromise, 
    searchParams 
}: PageProps) => {

    const { slug } = await paramsPromise

    const title = slug.split("-").join(" ")
    const { id } = await searchParams

    const symptoms = (await getDoctorsBySymptomId(id??""))?.data || []

    const symptomId = symptoms.map((symptom) => {
        return symptom.symptomIds = id
    })

    const doctorSymptom = symptoms?.map((doctor) => {
        return {
            id: doctor.id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            email: doctor.email??"",
            phone: doctor.phone??"",
            slug: generateSlug(`${doctor.firstName} ${doctor.lastName}`),
            doctorProfile: doctor,
        }
    })

    const otherSymptoms = symptomId ? (await getOtherDoctorSymptomBySymptom(symptomId))?.data || [] : []


  return (

    <div className='container p-8'>
        <h1 
            className='scroll-m-20 text-3xl font-extrabold 
            tracking-tight lg:text-4xl pb-6  capitalize'
        >
            {title} ({doctorSymptom?.length.toString().padStart(2,"0")})
        </h1>
        <div className='max-5-xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-4 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    Other Services
                </h2>
                {otherSymptoms && otherSymptoms.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {otherSymptoms.map((symptom) => {
                            return (
                                <Link 
                                    href={`/symptom/${symptom.slug}?id=${symptom.id}`}
                                    key={symptom.id} 
                                    className='hover:text-blue-600'
                                >
                                    {symptom.title}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className='col-span-8 grid grid-cols-2 gap-4'>
                {doctorSymptom && doctorSymptom.length > 0 ? (
                    doctorSymptom.map((doctor) => {
                        return (
                         <DoctorCard key={doctor.id} doctor={doctor} />
                        )
                    })
                ) : "No doctor available in this category."} 
            </div>
        </div>
    </div>
  )
}

export default page