import { UserContext } from "@/contexts/user.context";
import { useContext } from "react";

export default function Name() {
  const { user } = useContext(UserContext);
  return <p>Name: {user.name}</p>;
}
