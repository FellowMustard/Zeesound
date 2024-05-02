import { useEffect, useRef, useState } from "react";
import useRefreshToken from "./Hooks/useRefreshToken";
import useAuth from "./Hooks/useAuth";
import { Outlet } from "react-router-dom";

function AuthChecker() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const effectRun = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prevState) => (prevState = false));
      }
    };

    if (import.meta.env.VITE_NODE_ENV === "prod" || effectRun.current) {
      !auth?.token
        ? verifyRefreshToken()
        : setLoading((prevState) => (prevState = false));
    }

    return () => {
      effectRun.current = true;
    };
  }, []);

  return <>{loading ? null : <Outlet />}</>;
}

export default AuthChecker;
