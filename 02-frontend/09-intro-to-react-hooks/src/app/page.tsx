import Counter from "@/components/counter";
import CursorCirle from "@/components/cursor-circle";
import PopUp from "@/components/pop-up";
import ScrollNavigation from "@/components/scroll-navigation";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="uppercase text-4xl font-bold max-w-150 text-center">
        React Basic Component with useState Hooks
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Counter />
        <PopUp />
        <CursorCirle />
      </div>
      <ScrollNavigation />
    </main>
  );
}
