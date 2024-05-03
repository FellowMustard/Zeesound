import Layout from "../Components/Layout/Layout";
import LikedList from "../Components/List/LikedList";
import NewList from "../Components/List/NewList";
import useAuth from "../Hooks/useAuth";

function Home() {
  const { auth } = useAuth();
  return (
    <Layout>
      <div className="px-4 py-4 flex flex-col gap-4">
        <NewList></NewList>
        {auth.token ? <LikedList /> : <></>}
      </div>
    </Layout>
  );
}

export default Home;
