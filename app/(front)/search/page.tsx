
import { PageProps } from '@/.next/types/app/(front)/search/page'
import { getDoctorsBySearch } from '@/actions/doctors'
import { getService } from '@/actions/services'
import DoctorCard from '@/components/DoctorCard'
import LinkCard from '@/components/Frontend/Doctors/LinkCard'
import SymptomCard from '@/components/Frontend/Doctors/SymptomCard'
import ServiceList from '@/components/Frontend/Services/ServiceList'
import Link from 'next/link'
import React from 'react'



const page = async ({
    searchParams 
}: PageProps) => {
     

    const { query } = await searchParams
    console.log("Query:", query);
    
    const searchData = await getDoctorsBySearch(query as string)
    console.log("Search data:", searchData);
    
    const doctors = searchData?.doctors || [];
    const searchServices = searchData?.services || [];
    const specialties = searchData?.specialties || [];
    const symptoms = searchData?.symptoms || [];
    const allServices = (await getService()).data || [];
    const services = searchServices?.length > 0 ? searchServices : allServices

    console.log("doctors:", doctors);
    console.log("searchServices:", searchServices);
    console.log("specialties:", specialties);
    console.log("symptoms:", symptoms);
    console.log("all services", allServices);
    console.log("services", services);

  return (

    <div className='p-8'>
        <h1 
            className='scroll-m-20 text-3xl font-extrabold 
            tracking-tight lg:text-4xl pb-6 text-slate-700/80 dark:text-slate-400'
        >
            Search results for <span className='capitalize'>{query} </span>
        </h1>
        <div className='max-5-xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-3 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    Browse By Services
                </h2>
                {services && services.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {services.map((service) => {
                            return (
                                <Link 
                                    href={`/service/${service.slug}?id=${service.id}`}
                                    key={service.id} 
                                    className='hover:text-blue-600'
                                >
                                    {service.title} &nbsp;
                                    ({service._count.doctorProfile.toString().padStart(2,"0")})
                                </Link>
                            )
                        })}
                    </div>
                )} 
            </div>
            <div className='grid col-span-9'>
                {searchServices && searchServices.length > 0 && (
                    <div className='py-6 border-b'>
                        <h2 className='pb-3'>Results for {query} in services</h2>
                        <ServiceList data={searchServices}/>
                    </div>
                )}
                {specialties && specialties.length > 0 && (
                    <div className='py-6 border-b'>
                        <h2 className='pb-3'>Results for {query} in specialties</h2>
                        <LinkCard specialties={specialties}/>
                    </div>
                )}
                {symptoms && symptoms.length > 0 && (
                     <div className='py-6 border-b'>
                        <h2 className='pb-3'>Results for {query} in symptoms</h2>
                        <SymptomCard symptoms={symptoms} className='bg-slate-700'/>
                    </div>
                )}
                {doctors && doctors.length > 0 && (
                    <div className='py-6'>
                        <h2 className='pb-3'>Results for {query} in doctors</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {doctors.map((doctor) => {
                                return (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                                )
                            })}
                        </div>
                    </div>  
                )}
            </div>    
        </div>
    </div>
  )
}

export default page