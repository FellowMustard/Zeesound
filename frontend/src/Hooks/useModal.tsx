import { useContext } from "react";
import ModalContext from "../Context/ModalProvider";

const useModal = () => {
  return useContext(ModalContext);
};
export default useModal;
