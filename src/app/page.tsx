import CursorBall from "./components/CursorBall";
import { CursorBallProvider } from "./contexts/CursorBallContext";
import Home from "./components/Home";
import Image from "next/image";

export default function App() {
  return (
    <CursorBallProvider>
      <Home />
      <CursorBall />
    </CursorBallProvider>
  );
}
