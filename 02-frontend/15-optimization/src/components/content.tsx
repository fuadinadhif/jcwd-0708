import React from "react";

function Content({
  author,
  showAlert,
}: {
  author: string;
  showAlert: () => void;
}) {
  console.log("Content Rendered");

  return (
    <>
      <p>{author}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quisquam at
        expedita culpa ipsa. Accusantium rerum voluptatibus debitis culpa
        eligendi libero est velit incidunt, fugit aut voluptate rem?
        Praesentium, veniam?
      </p>
      <button onClick={showAlert} className="border w-full cursor-pointer">
        Show alert
      </button>
    </>
  );
}

export default React.memo(Content);
