import { Link } from "react-router-dom";
import Button_ from "../Button_";
import Pagination from "./Pagination";
import useAuth from "../../Hooks/useAuth";
import useLogout from "../../Hooks/useLogout";
import Tooltip_ from "../Tooltip_";

type headerProps = {
  scrollPos: number;
};
function Header({ scrollPos }: headerProps) {
  const { auth } = useAuth();
  const logout = useLogout();
  return (
    <nav
      className={`p-2 sticky left-0 top-0 w-full  duration-1000 rounded rounded-b-none flex justify-between transition ${
        scrollPos > 0 ? "bg-dark-card" : "bg-dark-card/75"
      }`}
    >
      <Pagination />
      <div className="flex gap-2">
        {auth?.token ? (
          <>
            <button className=" w-[40px] h-[40px] self-center bg-dark-primary transition group rounded-full relative scale-95 hover:scale-100 text-dark-text  hover:text-white">
              <span className="font-semibold">
                {auth.user[0].toUpperCase()}
              </span>
              <Tooltip_ className="group-hover:block hidden opacity-100 ">
                {auth.user}
              </Tooltip_>
            </button>
            <Button_
              className="bg-dark-primary px-8 rounded-full flex-1 h-full"
              onClick={logout}
            >
              Log Out
            </Button_>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button_ className="w-full h-full">Sign Up</Button_>
            </Link>
            <Link to="/login">
              <Button_ className="bg-dark-primary px-8 rounded-full w-full h-full">
                Log In
              </Button_>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
