"use client";

import { useState } from "react";
import Header from "@/components/prop-drilling/header";
import Card from "@/components/prop-drilling/card";

export default function Home() {
  const [user, setUser] = useState({
    id: 1,
    name: "Handoko",
    age: 25,
    address: "Jalan Braga, Bandung, Jawa Barat",
  });

  return (
    <>
      <Header user={user} />
      <main className="max-w-[900px] mx-auto">
        <Card user={user} />
      </main>
    </>
  );
}
