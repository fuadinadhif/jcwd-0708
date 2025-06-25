"use client";

import React, { createContext, useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}

export const UserContext = createContext(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    age: 0,
    address: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
