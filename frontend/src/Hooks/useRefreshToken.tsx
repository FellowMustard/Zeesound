import axios from "../api/axios";
import { cycleToken } from "../api/link";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth, setLikedSongs } = useAuth();
  const refresh = async () => {
    const response = await axios.get(cycleToken, { withCredentials: true });
    setAuth({
      token: response.data.token,
      user: response.data.user,
      email: response.data.email,
    });
    setLikedSongs(response.data.likedSong);
    return response.data.token;
  };

  return refresh;
}

export default useRefreshToken;
