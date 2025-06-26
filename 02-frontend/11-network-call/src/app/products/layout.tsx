import React from "react";

export const metadata = {
  title: "Aren Coffee - Products",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="px-4 text-3xl font-semibold">Products</h1>
      {children}
    </>
  );
}
