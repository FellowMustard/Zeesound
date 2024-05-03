import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewSongListAll } from "../api/link";
import axios from "../api/axios";
import Layout from "../Components/Layout/Layout";

type dataProps = {
  id: string;
  pic: string;
  title: string;
  author: string;
};

function Group() {
  const { state, id } = useParams();
  const [groupData, setGroupData] = useState<dataProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGroupFetching = async (api: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(api, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      let mappedData = response.data.map((song: any) => ({
        id: song._id,
        pic: song.imagePath,
        title: song.title,
        author: song.author.name,
      }));
      setGroupData(mappedData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      let stateChecker = "";
      switch (state) {
        case "new":
          stateChecker = getNewSongListAll;
          setTitle("Newest Song");
          break;
      }
      handleGroupFetching(stateChecker);
    }
  }, [state, id]);
  return (
    <Layout>
      {loading ? (
        <>
          <div className="w-1/5 h-6 rounded-full skeleton-loading min-w-[130px]"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full mt-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-dark-saturated p-4 rounded flex flex-col gap-2"
              >
                <div className="skeleton-loading w-full h-0 pt-[100%] relative rounded shadow-md"></div>
                <div className="w-full h-4 rounded-full skeleton-loading "></div>
                <div className="w-1/2 h-3 rounded-full skeleton-loading "></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <section>
          <div className="flex justify-between">
            <span className="text-3xl font-bold cursor-pointer px-3">
              {title}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full mt-4">
            {groupData.map((song) => {
              return (
                <Link to={`/song/${song.id}`} key={song.id}>
                  <div className="w-full hover:bg-white/10 p-3 rounded flex flex-col  cursor-pointer">
                    <img
                      src={song.pic}
                      className="w-full aspect-square object-cover"
                    ></img>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-dark-text text-sm font-semibold">
                      {song.author}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Group;
