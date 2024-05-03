import { createContext, useState } from "react";

type AuthState = {
  auth: any;
  likedSongs: string[];
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  setLikedSongs: React.Dispatch<React.SetStateAction<any>>;
};

type providerProps = {
  children: React.ReactNode;
};

const initialAuthState: AuthState = {
  auth: {},
  likedSongs: [],
  setAuth: () => {},
  setLikedSongs: () => {},
};
const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthProvider = ({ children }: providerProps) => {
  const [auth, setAuth] = useState({});
  const [likedSongs, setLikedSongs] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, likedSongs, setLikedSongs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
