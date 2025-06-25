"use client";

import Header from "@/components/header";
import Card from "@/components/card";
import { UserProvider } from "@/contexts/user.context";
import CustomInput from "@/components/custom-input";

export default function Home() {
  return (
    <>
      <UserProvider>
        <Header />
        <main className="max-w-[900px] mx-auto">
          <Card />
          <CustomInput />
        </main>
      </UserProvider>
    </>
  );
}
