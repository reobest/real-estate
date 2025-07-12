"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthUserQuery } from "../../state/api";
const Layout = ({ children }: { children: React.ReactNode }) => {
      const { data: authUser ,isLoading:authLoading} = useGetAuthUserQuery();
      const router = useRouter()
      const pathname = usePathname()
      const [isLoading,setIsLoading] = useState(true)
      useEffect(() => {
        if(authUser){
          const userRole = authUser?.userRole
          if((userRole === "manager" && pathname.includes("/search"))||
           (userRole === "tenant" && pathname === "/")){
            router.push(
              "/managers/properties",{scroll:false}
            )
          }
        }else{
          setIsLoading(false)
        }
      }, [authUser,router,pathname])
      if(authLoading || isLoading){
        return <>...Loading</>
      }
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
