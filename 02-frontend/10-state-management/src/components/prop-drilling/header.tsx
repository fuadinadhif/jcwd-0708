export default function Header({ user }: { user: { name: string } }) {
  return (
    <header className="flex justify-between max-w-[900px] mx-auto py-6">
      <h1>Logo (Prop Drilling)</h1>
      <p>Hi, {user.name}!</p>
    </header>
  );
}
