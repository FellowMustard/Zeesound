import Card_ from "../Card_";
import { RiHome6Fill, RiSearch2Line } from "react-icons/ri";
import Link_ from "../Link_";

function Sidebar() {
  const sidebarData = [
    {
      name: "Home",
      path: "/",
      icon: <RiHome6Fill />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <RiSearch2Line />,
    },
  ];
  return (
    <div className="w-full">
      <Card_ className="flex flex-col gap-3">
        {sidebarData.map((data, index) => {
          return (
            <Link_ key={index} path={data.path} icon={data.icon}>
              {data.name}
            </Link_>
          );
        })}
      </Card_>
    </div>
  );
}

export default Sidebar;
