import { createContext, useState } from "react";

type AuthState = {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

type providerProps = {
  children: React.ReactNode;
};

const initialAuthState: AuthState = {
  auth: {},
  setAuth: () => {},
};
const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthProvider = ({ children }: providerProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
