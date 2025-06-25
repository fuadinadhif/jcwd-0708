"use client";

import { UserContext } from "@/contexts/user.context";
import { useContext, useState } from "react";

export default function CustomInput() {
  const { setUser } = useContext(UserContext);
  const [inputState, setInputState] = useState({
    name: "",
    age: "",
    address: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    setUser(inputState);
    localStorage.setItem("user", JSON.stringify(inputState));
  }

  return (
    <form
      className="border border-white w-fit mx-auto py-2 px-4 mt-5 grid"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Insert the name"
        value={inputState.name}
        onChange={(event) =>
          setInputState({ ...inputState, name: event.target.value })
        }
      />
      <input
        type="number"
        placeholder="Insert your age"
        value={inputState.age}
        onChange={(event) =>
          setInputState({ ...inputState, age: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="Insert your current address"
        value={inputState.address}
        onChange={(event) =>
          setInputState({ ...inputState, address: event.target.value })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}

/* ---------------------------------- NOTE ---------------------------------- */
// const person = { name: "Abdi", age: 30, address: "Surabaya" };
// console.log(person);

// const anotherPerson = { ...person, gender: "Male", age: 10 };
// console.log(anotherPerson);
