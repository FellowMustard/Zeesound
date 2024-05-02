import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthChecker from "./AuthChecker";
import AuthValidator from "./AuthValidator";
import Song from "./Pages/Song";
import PersistFooter from "./PersistFooter";
function App() {
  return (
    <Routes>
      <Route element={<AuthChecker />}>
        <Route element={<PersistFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/song/:id" element={<Song />} />
        </Route>
        <Route element={<AuthValidator />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
