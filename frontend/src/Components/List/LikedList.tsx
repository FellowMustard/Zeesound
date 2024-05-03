import { useEffect, useRef, useState } from "react";
import SectionList from "../Layout/SectionList";
import { getUserLikedSong } from "../../api/link";
import useToast from "../../Hooks/useToast";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import useAxiosProtect from "../../Hooks/useAxiosProtect";

type dataProps = {
  id: string;
  pic: string;
  title: string;
  author: string;
};

function LikedList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [newSongData, setNewSongData] = useState<dataProps[]>([]);

  const toast = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const axiosProtect = useAxiosProtect();

  const effectRun = useRef(false);

  useEffect(() => {
    const getLikedSong = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axiosProtect.get(getUserLikedSong, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        const mappedData = response.data.likedSongs.map((song: any) => ({
          id: song._id,
          pic: song.imagePath,
          title: song.title,
          author: song.author.name,
        }));
        setNewSongData(mappedData);
        setLoading(false);
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
        setLoading(false);
      }
    };

    if (import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) {
      getLikedSong();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);
  return (
    <SectionList
      loading={loading}
      title="Song That You Like"
      data={newSongData}
    ></SectionList>
  );
}

export default LikedList;
