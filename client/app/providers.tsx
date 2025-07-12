"use client";
import React from "react";
import StoreProvider from "../state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <StoreProvider>
        <Authenticator.Provider>
          <Auth>{children}</Auth>
        </Authenticator.Provider>
      </StoreProvider>
    </SidebarProvider>
  );
};
export default Providers;
