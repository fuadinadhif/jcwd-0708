import Address from "./address";
import Age from "./age";
import Name from "./name";

export default function Card() {
  return (
    <div className="border border-white w-fit mx-auto py-2 px-4">
      <h1 className="font-bold text-center">USER DATA</h1>
      <Name />
      <Age />
      <Address />
    </div>
  );
}
