import { UserContext } from "@/contexts/user.context";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between max-w-[900px] mx-auto py-6">
      <h1>Logo</h1>
      <p>Hi, {user.name}!</p>
    </header>
  );
}
