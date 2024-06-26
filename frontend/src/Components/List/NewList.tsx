import { useEffect, useRef, useState } from "react";
import SectionList from "../Layout/SectionList";
import { getNewSongList } from "../../api/link";
import axios from "../../api/axios";

type dataProps = {
  id: string;
  pic: string;
  title: string;
  author: string;
};

function NewList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [newSongData, setNewSongData] = useState<dataProps[]>([]);

  const effectRun = useRef(false);

  useEffect(() => {
    const getNewSong = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get(getNewSongList, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const mappedData = response.data.map((song: any) => ({
          id: song._id,
          pic: song.imagePath,
          title: song.title,
          author: song.author.name,
        }));
        setNewSongData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) {
      getNewSong();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);
  return (
    <SectionList
      loading={loading}
      title="Newest Song"
      data={newSongData}
      allPath="/group/new"
    ></SectionList>
  );
}

export default NewList;
