import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { findSong } from "../../api/link";
import Link_ from "../Link_";
import { timeConvert } from "../../Function/timeConvert";
import PlayerBar from "./PlayerBar";
import useAudio from "../../Hooks/useAudio";

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

function Player() {
  const [songs, setSongs] = useState();
  const { isPlaying, setIsPlaying, songId, setSongId } = useAudio();

  const [currSongData, setCurrSongData] = useState<songProps>();

  const songRef = useRef<HTMLAudioElement>(null);

  const handlePlayPauseButton = () => {
    if (songRef.current) {
      setIsPlaying((prevState: any) => (prevState = !prevState));
    }
  };

  useEffect(() => {
    const handleFetchingSong = async () => {
      try {
        const { data } = await axios.get(findSong(songId), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(data);
        const mappedData = {
          id: data._id,
          pic: data.imagePath,
          title: data.title,
          link: data.songPath,
          author: {
            id: data.author._id,
            name: data.author.name,
            pic: data.author.pic,
          },
          duration: "00:00",
          currentTime: "00:00",
          progress: 0,
        };

        setCurrSongData((prevState) => (prevState = mappedData));
      } catch (err) {
        console.error(err);
      }
    };
    if (songId) {
      handleFetchingSong();
    }
  }, [songId]);

  const handleSongDataChanges = (data: any) => {
    setCurrSongData(data);
  };

  useEffect(() => {
    console.log(songRef.current);
    if (songRef.current) {
      if (isPlaying) {
        songRef.current.play();
      } else {
        songRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currSongData && songRef.current) {
      songRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        songRef.current?.removeEventListener(
          "loadedmetadata",
          onLoadedMetadata
        );
      };
    }
  }, [currSongData]);

  const onLoadedMetadata = () => {
    if (songRef.current) {
      const duration = timeConvert(songRef.current.duration);
      const ct = timeConvert(songRef.current.currentTime);
      const progress =
        (songRef.current.currentTime / songRef.current.duration) * 100;
      setCurrSongData((prevState) => ({
        ...prevState!,
        duration,
        progress,
        currentTime: ct,
      }));
      setIsPlaying(true);
    }
  };

  const onPlaying = () => {
    const duration = timeConvert(songRef.current!.duration);
    const ct = timeConvert(songRef.current!.currentTime);
    const progress =
      (songRef.current!.currentTime / songRef.current!.duration) * 100;
    setCurrSongData((prevState) => ({
      ...prevState!,
      duration,
      progress,
      currentTime: ct,
    }));
  };

  return (
    <div className="flex gap-2 justify-between align-center h-full p-2">
      <div className="flex gap-2 w-full">
        {currSongData && (
          <>
            <audio
              src={currSongData.link}
              ref={songRef}
              onTimeUpdate={onPlaying}
            />
            <img
              className="h-full aspect-square rounded object-cover"
              src={currSongData.pic}
            ></img>
            <div className="self-center">
              <Link_
                path={`/song/${currSongData.id}`}
                className="text-xs hover:underline font-semibold"
              >
                {currSongData.title}
              </Link_>
              <Link_
                path={`/song/${currSongData.id}`}
                className="text-xs hover:underline "
              >
                {currSongData.author.name}
              </Link_>
            </div>
          </>
        )}
      </div>
      <section className="flex gap-2 w-full justify-center flex-col">
        <PlayerBar
          handlePButton={handlePlayPauseButton}
          isPlaying={isPlaying}
          songData={currSongData}
          songRef={songRef}
          handleData={handleSongDataChanges}
        />
      </section>
      <section className="flex gap-2 w-full"></section>
    </div>
  );
}

export default Player;
