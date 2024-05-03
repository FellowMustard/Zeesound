import axios from "../api/axios";
import { userLogout } from "../api/link";
import useAuth from "./useAuth";

function useLogout() {
  const { setAuth, setLikedSongs } = useAuth();
  const logout = async () => {
    setAuth({});
    setLikedSongs([]);
    try {
      await axios(userLogout, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
}

export default useLogout;
