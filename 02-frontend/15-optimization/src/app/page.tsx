"use client";

import Image from "next/image";
import React, { useState, useMemo, useCallback } from "react";
import Content from "@/components/content";

export default function Home() {
  return (
    <>
      <Header />
      <Card />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Logo</h1>
    </header>
  );
}

function Card() {
  console.log("Card Rendered");

  const [likes, setLikes] = useState(0);
  const [iterator, setIterator] = useState(1_000_000_000);

  function expensiveCalculation(iterator: number) {
    let counter = 0;

    for (let i = 0; i < iterator; i++) {
      counter++;
    }

    return counter;
  }

  const expensiveValue = useMemo(() => {
    return expensiveCalculation(iterator);
  }, [iterator]);

  const optimizeShowAlert = useCallback(function showAlert() {
    alert("Heyo!");
  }, []);

  return (
    <div>
      <div className="relative w-full h-32">
        <Image
          src="https://images.unsplash.com/photo-1585412168334-8fa91429cc64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0eSUyMGxpZ2h0fGVufDB8fDB8fHwy"
          alt="City light taken from above the sky"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2>Article Title</h2>
        <p>💖 {likes} likes</p>
        <Content author="Alfa" showAlert={optimizeShowAlert} />
        <button
          className="border w-full cursor-pointer"
          onClick={() => setLikes((prev) => prev + 1)}
        >
          Add Like
        </button>
        <button
          className="border w-full cursor-pointer"
          onClick={() => setIterator(iterator + 1)}
        >
          Add Iterator (current: {iterator})
        </button>
      </div>
      <small className="border border-red-500 text-red-500 block text-center">
        {expensiveValue}
      </small>

      <div className="flex">
        <div className="h-10 bg-red-500 flex-1"></div>
        <div className="h-10 bg-yellow-500"></div>
      </div>
    </div>
  );
}
