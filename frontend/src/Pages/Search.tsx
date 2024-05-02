import Layout from "../Components/Layout/Layout";
import { MdOutlineSearch } from "react-icons/md";

function Search() {
  return (
    <Layout>
      <div className="px-4 py-4 mt-2">
        <div className="w-full relative">
          <input
            type="text"
            className="bg-dark-light p-3 pl-10 rounded-full font-semibold w-full md:w-1/2 min-w-[350px] outline-none relative"
            placeholder="Search"
          ></input>
          <MdOutlineSearch className="absolute left-3 text-xl top-[30%]" />
        </div>
      </div>
    </Layout>
  );
}

export default Search;
