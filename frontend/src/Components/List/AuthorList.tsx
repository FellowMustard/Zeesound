import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { findSongByAuthor } from "../../api/link";
import SectionList from "../Layout/SectionList";

type dataProps = {
  id: string;
  pic: string;
  title: string;
  author: string;
};
type authorListProps = {
  title: string;
  authorId: string;
  filteredSongId?: string;
};
function AuthorList({ title, authorId, filteredSongId }: authorListProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [songData, setSongData] = useState<dataProps[]>([]);

  const effectRun = useRef(false);

  useEffect(() => {
    const getSong = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get(findSongByAuthor(authorId), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        let mappedData = response.data.map((song: any) => ({
          id: song._id,
          pic: song.imagePath,
          title: song.title,
          author: song.author.name,
        }));
        if (filteredSongId) {
          mappedData = mappedData.filter(
            (data: dataProps) => data.id !== filteredSongId
          );
        }
        setSongData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) {
      getSong();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);

  return (
    <SectionList loading={loading} title={title} data={songData}></SectionList>
  );
}

export default AuthorList;
