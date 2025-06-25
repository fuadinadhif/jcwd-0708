import TransitionButton from "@/components/transition-button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col border min-h-screen justify-center items-center">
      <h1 className="text-2xl font-thin text-sky-blue">
        Welcome To TailwindCSS
      </h1>
      <p className="text-[rgb(50,90,168) max-w-2xl text-center mt-5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
        labore consectetur illo a veniam architecto nulla minima magnam ut sequi
        nihil sed reiciendis laudantium accusamus laboriosam recusandae, qui
        nisi iste.
      </p>

      <div className="flex gap-5 mt-5">
        <TransitionButton
          title="Scale"
          desc="Hover to scale up"
          customClass="from-pink-500 to-rose-500 hover:scale-150 duration-1000"
        />
        <TransitionButton
          title="Rotate"
          desc="Hover to rotate"
          customClass="from-yellow-500 to-orange-500 hover:rotate-10 duration-300"
        />
        <TransitionButton
          title="Shadow"
          desc="Hover for shadow"
          customClass="from-teal-500 to-cyan-500 hover:shadow-2xl duration-500"
        />
      </div>

      <div className="flex gap-2 mt-5">
        <Link href="/headless-ui" target="_blank" className="underline">
          Headless UI
        </Link>
        <Link href="/motion-dev" className="underline">
          Motion Dev
        </Link>
      </div>
    </main>
  );
}
