import { useEffect } from "react";
export const UsersList = (props) => {
  useEffect(() => {
    console.log(1);
    return () => {
      console.log(2);
    };
  });
  const clickHandler = (e) => {
    console.log("clicked");
    props.onSomeEvent({ foo: "bar" });
  };
  return (
    <div>
      <button onClick={clickHandler}>Click me</button>
    </div>
  );
};
