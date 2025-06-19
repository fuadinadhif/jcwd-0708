export default function Content(props: { userName: string; userAge: number }) {
  return (
    <main
      style={{
        border: "1px solid red",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="main-container"
    >
      <h2>Hi, {props.userName}!</h2>
      <p>Welcome to Purwadhika Bandung 👨🏼‍🦳</p>
      <p>You are {props.userAge} years old</p>
    </main>
  );
}
