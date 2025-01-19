
import { getUserById } from '@/actions/users';
import AdminProfilePanel from '@/components/Dashboard/Settings/AdminProfilePanel';
import CloseBtn from '@/components/FormInputs/CloseBtn';
import React from 'react'

const page = async ({params: paramsPromise}: any) => {

  const { id } = await paramsPromise;

  let user = null;
  try {
    user = (await getUserById(id)) || null;
  } catch (err) {
    console.log("Failed to get blog or categories:", err);
  }


  return (

    <div>
        <AdminProfilePanel 
          initialProfile={user ?? null}
          editingId={id ?? ""}
        />
        <CloseBtn href={'/settings'} variant="default" />
    </div>


  )
}

export default page