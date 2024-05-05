import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNewSongListAll, getUserLikedSongAll } from "../api/link";
import axios from "../api/axios";
import Layout from "../Components/Layout/Layout";
import useAxiosProtect from "../Hooks/useAxiosProtect";
import useToast from "../Hooks/useToast";
import useLogout from "../Hooks/useLogout";

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

  const axiosProtect = useAxiosProtect();

  const toast = useToast();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleGroupFetching = async (
    api: string,
    protect?: boolean | false
  ) => {
    if (loading) return;
    setLoading(true);
    try {
      let response;
      if (protect) {
        response = await axiosProtect.get(api, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      } else {
        response = await axios.get(api, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      }
      console.log(response);
      let mappedData = response.data.map((song: any) => ({
        id: song._id,
        pic: song.imagePath,
        title: song.title,
        author: song.author.name,
      }));
      setGroupData(mappedData);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      if (protect) {
        if (!err?.response) {
          toast?.open(err, "error");
        } else {
          const { status } = err.response;
          if (status === 401 || status === 403) {
            logout();
            navigate("/login", { replace: true });
          } else {
            toast?.open(err.response.data.message, "error");
          }
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      let stateChecker = "";
      let protect = false;
      switch (state) {
        case "new":
          stateChecker = getNewSongListAll;
          setTitle("Recently Uploaded Song");
          break;
        case "liked":
          stateChecker = getUserLikedSongAll;
          protect = true;
          setTitle("Recently Liked Song");
          break;
      }
      handleGroupFetching(stateChecker, protect);
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
