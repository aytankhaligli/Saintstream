import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      // Enable scrolling when the component unmounts
      document.body.style.overflowY = "auto";
    };
  }, [isModalOpen]);

  const value = {
    isModalOpen,
    openModal,
    closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
