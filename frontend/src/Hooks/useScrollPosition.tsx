import { useEffect, useState } from "react";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updatePosition = () => {
    setScrollPosition((prevState) => (prevState = window.scrollY));
  };
  useEffect(() => {
    updatePosition();

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

export default useScrollPosition;
