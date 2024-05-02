import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { timeConvert } from "../../Function/timeConvert";
type playerBarProps = {
  handlePButton: () => void;
  isPlaying: boolean;
  songData: songProps | undefined;
  songRef: React.RefObject<HTMLAudioElement>;
  handleData: (state: any) => void;
};

type songProps = {
  id: string;
  pic: string;
  title: string;
  link: string;
  duration: string;
  currentTime: string;
  author: {
    id: string;
    name: string;
    pic: string;
  };
  progress: number;
};

function PlayerBar({
  handlePButton,
  isPlaying,
  songData,
  songRef,
  handleData,
}: playerBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (barRef.current && songRef.current && isDragging) {
        e.preventDefault();
        const barWidth = barRef.current.clientWidth;
        const offsetX = e.clientX - barRef.current.getBoundingClientRect().left;
        let newPosition = (offsetX / barWidth) * songRef.current.duration;
        newPosition = Math.max(
          0,
          Math.min(newPosition, songRef.current.duration)
        );

        songRef.current.currentTime = newPosition;
        const newProgress = (newPosition / songRef.current.duration) * 100;
        handleData((prevState: any) => ({
          ...prevState!,
          progress: newProgress,
          currentTime: timeConvert(newPosition),
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const jumpTime = (e: React.MouseEvent<HTMLDivElement>) => {
    if (barRef.current && songRef.current) {
      const barWidth = barRef.current.clientWidth;
      const offsetX = e.clientX - barRef.current.getBoundingClientRect().left;
      const newPosition = (offsetX / barWidth) * songRef.current.duration;
      if (newPosition >= 0 && newPosition <= songRef.current.duration) {
        songRef.current.currentTime = newPosition;
        const newProgress = (newPosition / songRef.current.duration) * 100;
        handleData((prevState: any) => ({
          ...prevState!,
          progress: newProgress,
          currentTime: timeConvert(newPosition),
        }));
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={handlePButton}
          className="w-[35px] h-[35px] bg-dark-primary text-white rounded-full flex justify-center items-center  hover:scale-110 transition ease-linear"
        >
          {isPlaying ? (
            <FaPause className="text-sm" />
          ) : (
            <FaPlay className="text-sm" />
          )}
        </button>
      </div>
      <div className="w-full flex gap-1 text-xs text-dark-text items-center">
        <p className="w-[34px]">{songData?.currentTime || "--:--"}</p>

        <div
          className="w-full bg-dark-card h-[6px] rounded-full hover:cursor-pointer relative group"
          ref={barRef}
          onMouseDown={() => {
            setIsDragging(true);
          }}
          onClick={jumpTime}
        >
          <div
            className=" h-full bg-dark-primary rounded-full"
            style={{
              width: songData?.progress + "%",
            }}
          ></div>

          <div
            className="absolute w-4 h-4 bg-white rounded-full border-2 shadow-lg group-hover:block hidden"
            style={{
              left: `calc(${songData?.progress || 0}% - 6px)`,
              top: "-90%",
            }}
          ></div>
        </div>
        <p className="w-[34px]">{songData?.duration || "--:--"}</p>
      </div>
    </>
  );
}

export default PlayerBar;
