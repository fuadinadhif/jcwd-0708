import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between p-6">
      <h1>Logo</h1>
      <Link href={"/auth/sign-in"}>Sign In</Link>
    </header>
  );
}
