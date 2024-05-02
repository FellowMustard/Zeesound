import React, { createContext, useState } from "react";
import LimitedModal from "../Components/Modals/LimitedModal";
import UploadModal from "../Components/Modals/UploadModal";
import AuthorModal from "../Components/Modals/AuthorModal";

interface ModalData {
  [key: string]: React.ReactNode;
}

type ModalValue = {
  openModal: (name: string) => void;
};
type ModalProps = {
  children: React.ReactNode;
};

const initialModalContext = {
  openModal: () => {},
};

const ModalContext = createContext<ModalValue>(initialModalContext);

export const ModalProvider = ({ children }: ModalProps) => {
  const [modal, setModal] = useState<string | null>(null);

  const openModal = (name: string) => {
    setModal(name);
  };
  const closeModal = () => {
    setModal(null);
  };

  const modalData: ModalData = {
    Limited_Modal: <LimitedModal onClose={closeModal} />,
    Upload_Modal: <UploadModal onClose={closeModal} />,
    Author_Modal: <AuthorModal onClose={closeModal} />,
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modal ? modalData[modal] : <></>}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
