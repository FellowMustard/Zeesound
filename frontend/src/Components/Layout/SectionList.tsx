import { Link } from "react-router-dom";

type listProps = {
  loading: boolean;
  title: string;
  data: dataProps[];
};
type dataProps = {
  id: string;
  pic: string;
  title: string;
  author: string;
};
function SectionList({ loading, title, data }: listProps) {
  return (
    <>
      {loading ? (
        <>
          <div className="w-1/5 h-6 rounded-full skeleton-loading min-w-[130px]"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
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
            <span className="text-xl font-bold cursor-pointer hover:underline px-3">
              {title}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full mt-4">
            {data.map((song) => {
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
    </>
  );
}

export default SectionList;
