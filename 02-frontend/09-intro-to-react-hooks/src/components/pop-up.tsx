"use client";

import { useState } from "react";

export default function PopUp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button
        className="bg-pink-300 rounded-sm text-white py-4 px-6 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Show Pop Up
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 m-auto flex flex-col justify-center items-center bg-[rgba(0,0,0,0.6)]">
          <div className="bg-white max-w-170 px-6 py-4 rounded-lg relative">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
              reprehenderit animi error voluptas adipisci possimus recusandae
              maxime quaerat sed consequatur. Exercitationem esse quo voluptate
              aspernatur nisi atque cum ea accusamus?
            </p>
            <button
              className="bg-pink-300 rounded-sm text-white p-4 mt-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button className="absolute top-0 right-0">X</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- NOTES --------------------------------- */
// console.log(false && "Hello")
