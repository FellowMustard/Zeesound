import { useEffect } from "react";
import { axiosProtect } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

function useAxiosProtect() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosProtect.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axiosProtect.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosProtect(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosProtect.interceptors.request.eject(requestInterceptor);
      axiosProtect.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosProtect;
}

export default useAxiosProtect;
