import { Outlet } from "react-router-dom";
import Player from "./Components/Layout/Player";
import { useEffect, useRef } from "react";
import useAudio from "./Hooks/useAudio";

function PersistFooter() {
  const effectRun = useRef(false);
  const { setSongId, setIsPlaying } = useAudio();

  useEffect(() => {
    return () => {
      if (effectRun.current) {
        setIsPlaying(false);
        setSongId("");
      }
      effectRun.current = true;
    };
  }, []);
  return (
    <>
      <div className="flex w-full h-full  flex-col">
        <Outlet />
        <div className="w-full h-20 bg-black">
          <Player />
        </div>
      </div>
    </>
  );
}

export default PersistFooter;
