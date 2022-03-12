import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Home() {
  const value = useContext(AppContext);

  return (
    <>
      <h1>Home</h1>
      <p>
        Playing is {`${value.state.playing}`}
      </p>
    </>
  )
}
