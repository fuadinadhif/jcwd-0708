import Header from "@/components/header";
import Content from "@/components/content";

export default function Home() {
  const userName = "Albertos";
  const userAge = 75;

  return (
    <>
      <Header userName={userName} userAge={userAge} />
      <Content userName={userName} userAge={userAge} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    NOTES                                   */
/* -------------------------------------------------------------------------- */
/* ------------------------- How to create component ------------------------ */
// 1. Create a function
// 2. Function name should be PascalCase
// 3. The function should return an html tag
// 4. Export default the function

/* ------------------------- Expression vs Statement ------------------------ */
// 1. Expression -> A value
// variable name
// true ? "benar" : "salah"

// 2. Statement -> An action
// function definition
// class definition
