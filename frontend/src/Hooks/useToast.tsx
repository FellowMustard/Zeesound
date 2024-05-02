import { useContext } from "react";
import { ToastContext } from "../Context/ToastProvider";

const useToast = () => {
  return useContext(ToastContext);
};
export default useToast;
