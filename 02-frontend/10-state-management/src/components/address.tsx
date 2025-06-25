import { UserContext } from "@/contexts/user.context";
import { useContext } from "react";

export default function Address() {
  const { user } = useContext(UserContext);
  return <p>Address: {user.address}</p>;
}
