import { useEffect, useRef } from "react";

type timeoutProps = {
  callBackFunction: () => void;
  delay: number;
};

function useTimeout({ callBackFunction, delay }: timeoutProps) {
  const currCallback = useRef(callBackFunction);

  useEffect(() => {
    currCallback.current = callBackFunction;
  }, [callBackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => {
      currCallback.current();
    }, delay);
    return () => clearTimeout(functionId);
  }, []);
}

export default useTimeout;
