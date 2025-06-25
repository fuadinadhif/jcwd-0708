export default function TransitionButton(props: {
  title: string;
  desc: string;
  customClass: string;
}) {
  return (
    <article
      className={`${props.customClass} bg-gradient-to-r p-6 rounded-2xl text-white flex flex-col items-center transition-transform`}
    >
      <h2 className="text-3xl font-bold">{props.title}</h2>
      <p>{props.desc}</p>
    </article>
  );
}
