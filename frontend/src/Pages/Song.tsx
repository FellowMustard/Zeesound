import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { CSSProperties, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { findSong } from "../api/link";
import { extractDominantColor } from "../Function/color";
import { FaPause, FaPlay } from "react-icons/fa";
import useAudio from "../Hooks/useAudio";

type songProps = {
  id: string;
  pic: string;
  title: string;
  author: {
    id: string;
    name: string;
    pic: string;
  };
};

function Song() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [songData, setSongData] = useState<songProps>();
  const [dominantColor, setDominantColor] = useState<string>("");

  const [textColor, setTextColor] = useState<string>("");

  const effectRun = useRef(false);
  const { isPlaying, setIsPlaying, songId, setSongId } = useAudio();

  const getNewSong = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.get(findSong(id!), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const mappedData = {
        id: data._id,
        pic: data.imagePath,
        title: data.title,
        author: {
          id: data.author._id,
          name: data.author.name,
          pic: data.author.pic,
        },
      };

      setSongData(mappedData);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if ((import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) && id) {
      getNewSong();
    }
    return () => {
      effectRun.current = true;
    };
  }, [id]);

  useEffect(() => {
    const fetchColor = async () => {
      if (songData) {
        try {
          const color = await extractDominantColor(songData.pic);
          setDominantColor(color.color);
          setTextColor(color.textColor);
        } catch (error) {
          console.error("Error extracting dominant color:", error);
        }
      }
    };
    fetchColor();
  }, [songData]);

  const handlePlay = () => {
    if (songId !== songData!.id) {
      setIsPlaying(false);
      setSongId(songData!.id);
    } else {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const gradientStyle: CSSProperties = {
    "--tw-gradient-from": `${dominantColor} var(--tw-gradient-from-position)`,
    "--tw-gradient-to": "rgb(255 255 255 / 0) var(--tw-gradient-to-position)",
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
  } as CSSProperties;
  return (
    <Layout>
      {dominantColor && songData && !loading && (
        <main className="flex flex-col">
          <div
            className="w-full p-6 flex gap-6"
            style={{ background: dominantColor, color: textColor }}
          >
            <img
              src={songData.pic}
              className="w-1/5 aspect-square object-cover rounded shadow-lg"
            ></img>
            <div className="self-center font-semibold cursor-pointer">
              <p className="ml-1">Song</p>
              <p className="text-6xl">{songData.title}</p>
              <p className="mt-8 flex gap-2 group :">
                <img
                  src={songData.author.pic}
                  className="w-6 h-6 rounded-full"
                ></img>
                <span className="group-hover:underline">
                  {songData.author.name}
                </span>
              </p>
            </div>
          </div>
          <div
            style={gradientStyle}
            className={`p-6 bg-gradient-to-b to-transparent`}
          >
            {songId === songData.id && isPlaying ? (
              <button
                onClick={() => {
                  handlePause();
                }}
                className="text-lg w-[55px] h-[55px] bg-dark-primary text-white rounded-full flex justify-center items-center  hover:scale-110 transition ease-linear"
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="text-lg w-[55px] h-[55px] bg-dark-primary text-white rounded-full flex justify-center items-center  hover:scale-110 transition ease-linear"
                onClick={() => {
                  handlePlay();
                }}
              >
                <FaPlay />
              </button>
            )}
          </div>
        </main>
      )}
    </Layout>
  );
}

export default Song;
