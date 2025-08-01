import { RegisterForm } from "../components/register-form";

export function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4 uppercase">Register</h2>
      <RegisterForm />
    </div>
  );
}
