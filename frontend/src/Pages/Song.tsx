import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { CSSProperties, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { dislikeSong, findSong, likeSong } from "../api/link";
import { extractDominantColor } from "../Function/color";
import { FaPause, FaPlay } from "react-icons/fa";
import useAudio from "../Hooks/useAudio";
import AuthorList from "../Components/List/AuthorList";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import useToast from "../Hooks/useToast";
import useLogout from "../Hooks/useLogout";
import useAxiosProtect from "../Hooks/useAxiosProtect";
import useModal from "../Hooks/useModal";

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
  const { id } = useParams();
  const effectRun = useRef(false);

  const toast = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const { openModal } = useModal();

  const axiosProtect = useAxiosProtect();

  const [loading, setLoading] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [songData, setSongData] = useState<songProps>();
  const [dominantColor, setDominantColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const { isPlaying, setIsPlaying, songId, setSongId } = useAudio();
  const { auth, likedSongs, setLikedSongs } = useAuth();

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
      setIsLiking(() => {
        return likedSongs.includes(mappedData.id);
      });

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

  const handleLike = async (like: boolean) => {
    if (!auth.token) {
      openModal("Limited_Modal");
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);

    try {
      await axiosProtect.put(like ? likeSong : dislikeSong, {
        songId: songData!.id,
      });
      if (like) {
        setIsLiking(true);
        setLikedSongs((prevState: any) => {
          return [...prevState, songData!.id];
        });
      } else {
        setIsLiking(false);
        const filtered = likedSongs.filter((songId) => songId !== songData!.id);
        setLikedSongs(filtered);
      }
      setLikeLoading(false);
    } catch (err: any) {
      if (!err?.response) {
        toast?.open(err, "error");
      } else {
        const { status } = err.response;
        if (status === 401 || status === 403) {
          console.error(err);
          logout();
          navigate("/login", { replace: true });
        } else {
          toast?.open(err.response.data.message, "error");
        }
      }
      setLikeLoading(false);
    }
  };

  const gradientStyle: CSSProperties = {
    "--tw-gradient-from": `${dominantColor} var(--tw-gradient-from-position)`,
    "--tw-gradient-to": "rgb(255 255 255 / 0) var(--tw-gradient-to-position)",
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
  } as CSSProperties;
  return (
    <Layout>
      {dominantColor && songData && !loading && (
        <main className="flex flex-col h-full">
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
            className={`p-6 bg-gradient-to-b to-transparent flex gap-6`}
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
            {likeLoading ? (
              <button
                className="text-3xl animate-bounce"
                style={{ color: textColor }}
              >
                <FaRegHeart />
              </button>
            ) : isLiking ? (
              <motion.button
                onClick={() => handleLike(false)}
                className="ping-once flex justify-center items-center before:w-10 before:rounded-full before:absolute before:h-10 text-3xl text-dark-primary relative before:bg-dark-error"
                initial={{
                  scale: 1,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
              >
                <FaHeart className="z-20 " />
              </motion.button>
            ) : (
              <button
                onClick={() => handleLike(true)}
                className="text-3xl"
                style={{ color: textColor }}
              >
                <FaRegHeart />
              </button>
            )}
          </div>
          <div className="p-6">
            <AuthorList
              authorId={songData.author.id}
              title={`Other Song by ${songData.author.name}`}
              filteredSongId={songData.id}
            />
          </div>
        </main>
      )}
    </Layout>
  );
}

export default Song;
