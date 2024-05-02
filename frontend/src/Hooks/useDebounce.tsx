import { useEffect, useState } from "react";

type debounceProps = {
  value: any;
  delay?: number | 500;
};

const useDebounce = ({ value, delay }: debounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
