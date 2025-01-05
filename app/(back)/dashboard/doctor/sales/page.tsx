import { getAppointmentByPatientIdAndDoctorId, getAppointmentSaleByDoctorId } from '@/actions/appointments'
import { getDoctorProfileByUserId } from '@/actions/onboarding'
import { getDoctorSales } from '@/actions/sales'
import Sales from '@/components/Dashboard/Doctor/Sales'
import { authOptions } from '@/lib/auth'
import { AppointmentSaleProps } from '@/utils/types'
import { Sale } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'


const page = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user || null;
    const role = user?.role || undefined;
    const userId = user?.id || "";

    const doctorProfile = (await getDoctorProfileByUserId(userId))?.data || null;
    const doctorId = doctorProfile?.id || ""
    //console.log("doctorId: ",doctorId );

    const appointments = (await getAppointmentSaleByDoctorId(userId))?.data || [];
    const doctorSales = await getDoctorSales(doctorId) || [];
    //console.log("Doctor sales:", doctorSales);
  return (

    <div>
        {doctorSales && (
            <Sales 
              saleData={doctorSales ?? []} 
              role={role ?? undefined} 
              appointments={appointments ?? []} 
              title="sales" />
        )}
    </div>

  )
}

export default page