export default function Header(props: { userAge: number; userName: string }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Logo</h1>
      <div style={{ display: "flex", gap: "4px" }}>
        <p>Hi, {props.userName}!</p>
        <p>You are {props.userAge} years old</p>
      </div>
    </header>
  );
}
