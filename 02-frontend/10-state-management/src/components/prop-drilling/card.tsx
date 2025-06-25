import Address from "./address";
import Age from "./age";
import Name from "./name";

export default function Card({
  user,
}: {
  user: { name: string; age: number; address: string };
}) {
  return (
    <div className="border border-white w-fit mx-auto py-2 px-4">
      <h1 className="font-bold text-center">USER DATA</h1>
      <Name name={user.name} />
      <Age age={user.age} />
      <Address address={user.address} />
    </div>
  );
}
