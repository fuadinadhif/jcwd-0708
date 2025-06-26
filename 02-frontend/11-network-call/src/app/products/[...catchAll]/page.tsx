export default async function CatchAll({
  params,
}: {
  params: Promise<{ objectId: string }>;
}) {
  console.log(await params);
  return <main>Catch All</main>;
}
