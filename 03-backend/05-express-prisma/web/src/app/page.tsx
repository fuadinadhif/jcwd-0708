"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          `http://localhost:8888/users?page=${currentPage}`
        );
        const data = await response.json();

        setUsers(data.data);
        setCurrentPage(data.page);
        setTotalPage(data.totalPage);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, [currentPage]);

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  try {
    return (
      <main>
        {users?.map((item) => (
          <p key={item.id}>{item.firstName}</p>
        ))}
        <button onClick={handlePrev}>Prev</button>
        <span>
          Page {currentPage} of {totalPage}
        </span>
        <button onClick={handleNext}>Next</button>
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main>
        <p>Failed to get users data</p>
      </main>
    );
  }
}
