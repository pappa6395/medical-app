import { getUserById } from '@/actions/users'
import Settings from '@/components/Dashboard/Settings'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'



const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || "";
  const role = user?.role || undefined;

  if (!user?.id) {
    return <div>You must be logged in to access this page.</div>
  }
  if (role !== "ADMIN") {
    return <NotAuthorized />
  }

  let userProfile = null;
  try {
    userProfile = await getUserById(userId) || null;
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }

  return (

    <div>
      <Settings userProfile={userProfile ?? null} />
    </div>

  )
}

export default page