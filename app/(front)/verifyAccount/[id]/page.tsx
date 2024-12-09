

import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default async function VerifyAccount(params: any ) {

  const { id } = await params

  //Get a User fromm DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role

  return (
     <div className="min-h-screen flex items-center justify-center
      bg-slate-50 dark:bg-slate-950">
       <Card className="mx-auto max-w-md bg-white dark:bg-slate-900 ">
        <CardHeader>
          <CardTitle className="text-xl">Verify Token</CardTitle>
          <CardDescription>Please enter the 6-figure pass code sent to your email - {user?.email}.</CardDescription>
        </CardHeader>
        <CardContent className="border-none shadow-none">
          <VerifyTokenForm role={role} userToken={userToken} id={id} />
        </CardContent>
        
      </Card>
     </div>
    );
}



