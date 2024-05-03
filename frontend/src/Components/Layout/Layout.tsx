import { useEffect, useRef, useState } from "react";
import Card_ from "../Card_";
import Header from "./Header";
import Library from "./Library";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  const [scrollPos, setScrollPos] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const { scrollTop } = cardRef.current;
        setScrollPos(scrollTop);
      }
    };

    if (cardRef.current) {
      cardRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="flex gap-2 h-full">
        <section className="min-w-[300px] md:flex flex-col gap-2 hidden">
          <Sidebar />
          <Library />
        </section>

        <Card_
          refProp={cardRef}
          className="flex-1 h-full relative !p-0 overflow-y-auto "
        >
          <Header scrollPos={scrollPos} />
          {children}
        </Card_>
      </div>
    </>
  );
}

export default Layout;
