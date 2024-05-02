import Layout from "../Components/Layout/Layout";
import NewList from "../Components/List/NewList";

function Home() {
  return (
    <Layout>
      <div className="px-4 py-4">
        <NewList></NewList>
      </div>
    </Layout>
  );
}

export default Home;
