"use client";

import { useRef } from "react";

const articles = [
  { id: 1, title: "Soekarno", content: "Short content about Soekarno" },
  { id: 2, title: "Soeharto", content: "Short content about Soeharto" },
  { id: 3, title: "B.J Habibie", content: "Short content about B.J Habibie" },
];

export default function ScrollNavigation() {
  const soekarnoRef = useRef(null);
  const soehartoRef = useRef(null);
  const bjHabibieRef = useRef(null);

  function scrollToSection(ref) {
    // const title = document.getElementById("title")
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col gap-2 mt-5">
      <div>
        <button onClick={() => scrollToSection(soekarnoRef)}>Soekarno</button>
        <button onClick={() => scrollToSection(soehartoRef)}>Soeharto</button>
        <button onClick={() => scrollToSection(bjHabibieRef)}>
          B.J Habibie
        </button>
      </div>
      <article className="h-100 card flex flex-col" ref={soekarnoRef}>
        <h2 className="font-bold">Soekarno</h2>
        <p>Short description here</p>
      </article>
      <article className="h-100 card flex flex-col" ref={soehartoRef}>
        <h2 className="font-bold">Soeharto</h2>
        <p>Short description here</p>
      </article>
      <article className="h-100 card flex flex-col" ref={bjHabibieRef}>
        <h2 className="font-bold">B.J Habibie</h2>
        <p>Short description here</p>
      </article>

      {/* {articles.map((item) => (
        <article key={item.id} className="h-100 card flex flex-col">
          <h2 className="font-bold">{item.title}</h2>
          <p>{item.content}</p>
        </article>
      ))} */}
    </div>
  );
}
