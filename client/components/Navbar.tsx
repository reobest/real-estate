"use client";
import React from "react";
import Image from "next/image";
import logo from "../public/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAuthUserQuery } from "../state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  console.log(authUser);
  
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-black h-[50px] flex justify-between items-center px-4 py-2 fixed top-0 z-50">
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-1 ">

        {
          isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger/>
            </div>
          )
        }
        <Image
          width={24}
          height={24}
          src={logo}
          alt="logo"
          className="w-6 h-6 "
        />
        <div>
          <span className="text-white text hover:text-white/80">RENT</span>
          <span className="text-rose-300 hover:text-rose-200">IFUL</span>
        </div>
        </div>
        {isDashboardPage && authUser && (
          <Button
            variant="secondary"
            className="md:ml-4  text-white bg-transparent hover:bg-transparent cursor-pointer  hover:text-white/60"
            onClick={() =>
              router.push(
                authUser?.userRole?.toLowerCase() === "manager"
                  ? "/managers/newproperty"
                  : "/search"
              )
            }
          >
            {authUser?.userRole.toLowerCase() === "manager" ? (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden md:block ml-2">Add new property</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span className="hidden md:block ml-2">Search properties</span>
              </>
            )}
          </Button>
        )}
      </div>
      {!isDashboardPage && (
        <p className="text-white/80 text-sm hidden md:block">
          Discover your perfect rental appartment with our advanced search
        </p>
      )}
      <div className="flex items-center gap-2">
        {authUser ? (
          <>
            <div className="relative hidden md:block">
              <MessageCircle className="w-6 h-6 curor-pointer text-white/80 hover:text-white/70" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
            <div className="relative hidden md:block">
              <Bell className="w-6 h-6 curor-pointer text-white/80 hover:text-white/70" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <Avatar>
                  <AvatarImage src={authUser?.userInfo?.image} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <p className="text-white/80 hidden md:block">
                  {authUser?.userInfo?.name}
                </p>  
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black">
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-black focus:text-white font-semibold "
                  onClick={() =>
                    router.push(
                      authUser?.userRole?.toLowerCase() === "manager"
                        ? "managers/properties"
                        : "/tenants/favorites",
                      { scroll: false }
                    )
                  }
                >
                  Go to dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-black focus:text-white "
                  onClick={() =>
                    router.push(
                      `${authUser?.userRole?.toLowerCase()}s/settings`
                    )
                  }
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-black focus:text-white "
                  onClick={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/signin">
              <Button
                variant="outline"
                className="bg-transparent text-white h-[30px]"
              >
                Signin
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
