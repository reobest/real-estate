"use client"
import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import AppSidebar from "../../components/AppSidebar";
import { useGetAuthUserQuery } from "../../state/api";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: authUser ,isLoading:authLoading} = useGetAuthUserQuery();
    const router = useRouter()
    const pathname = usePathname()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
      if(authUser){
        const userRole = authUser?.userRole
        if((userRole === "manager" && pathname.includes("/tenants"))|| (userRole === "tenant" && pathname.includes("/managers"))){
          router.push(
            userRole === "manager" ? "/manager/properties" : "/tenants/favorites",{scroll:false}
          )
        }
      }else{
        setIsLoading(false)
      }
    }, [authUser,router,pathname])
    if(authLoading || isLoading){
      // return <>...Loadin</>
    }
  if(!authUser?.userRole) return null
  return (
      <div className="min-h-screen min-w-screen bg-white">
        <Navbar />
        <div className="pt-[40px]">
          <main className="flex">
            <AppSidebar userType={authUser?.userRole?.toLowerCase()} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
};

export default DashboardLayout;
