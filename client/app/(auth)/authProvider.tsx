import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import "../globals.css";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname, useRouter } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7 flex flex-col items-center">
        <Heading level={3} className="!text-2xl !font-bold">
          RENT
          <span className="text-pink-600 font-light hover:text-gray-400">
            IFUL
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please sign in to
          continue.
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="mt-4 mb-7 flex flex-col items-center">
          <p className="text-muted-foreground">
            Dont have an account?
            <button
              className="text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
              onClick={toSignUp}
            >
              Sign up here
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp : {
    FormFields(){
        const {validationErrors} = useAuthenticator();
        return (
            <>
            <Authenticator.SignUp.FormFields/>
            <RadioGroupField
            legend="Role"
            name="custom:role"
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
            >
                <Radio value="tenant">Tenant</Radio>
                <Radio value="manager">Manager</Radio>
            </RadioGroupField>
            </>
        )
    }
  }
};

const FormFields = {
  signIn: {
    username: {
      placeholder: "Enter Your Email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter Your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter Your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm",
      isRequired: true,
    },
  },
};
export default function Auth({ children }: { children: React.ReactNode }) {
    const {user} = useAuthenticator((context) => [context.user])
    const router = useRouter()
    const pathname = usePathname()
    const isAuthPage = pathname.match(/^\/(signin|signup)$/)
    const isDashboardPage = pathname.startsWith("/manager") || pathname.startsWith("/tenants")
    useEffect(() => {
        if(user && isAuthPage){
            router.push("/")
        }
    },[user,isAuthPage,router])
    if(!isAuthPage && !isDashboardPage){
        return <>{children}</>
    }
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Authenticator components={components} formFields={FormFields}>
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
}
