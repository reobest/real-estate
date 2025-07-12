"use client";
import Link from "next/link";
import React from "react";

export default function SigninPage() {
  return (
    <>
      <p>Welcome, youre signed in!</p>
      <Link href='/landing' className="text-blue-600" >Go to Home page</Link>
    </>
  );
}