import axios from "../api/axios";
import { cycleToken } from "../api/link";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(cycleToken, { withCredentials: true });
    setAuth((prevState: any) => (prevState = response.data));
    console.log(response.data);
    return response.data.token;
  };

  return refresh;
}

export default useRefreshToken;