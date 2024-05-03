import { Outlet } from "react-router-dom";
import Player from "./Components/Layout/Player";
import { useEffect, useRef } from "react";
import useAudio from "./Hooks/useAudio";

function PersistFooter() {
  const effectRun = useRef(false);
  const { setSongId, setIsPlaying } = useAudio();

  useEffect(() => {
    return () => {
      if (import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) {
        setIsPlaying(false);
        setSongId("");
      }
      effectRun.current = true;
    };
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen max-h-screen">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <div className="h-20">
          <Player />
        </div>
      </div>
    </>
  );
}

export default PersistFooter;
