import axios from "../api/axios";
import { userLogout } from "../api/link";
import useAuth from "./useAuth";

function useLogout() {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      await axios(userLogout, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
}

export default useLogout;
