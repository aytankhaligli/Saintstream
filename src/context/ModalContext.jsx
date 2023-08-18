import { createContext, useEffect, useState, useRef } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const modalRef = useRef();

  function openModal(type = "modal") {
    if (type === "share") {
      setShareModal(true);
    } else if (type === "dropdown") {
      setDropdownOpen((pre) => !pre);
    } else if (type === "modal") {
      setIsModalOpen(true);
      // console.log(isModalOpen);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setDropdownOpen(false);
    setShareModal(false);
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

  useEffect(() => {
    const outsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", outsideClick);

    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, []);

  const value = {
    isModalOpen,
    openModal,
    closeModal,
    shareModal,
    modalRef,
    isDropdownOpen,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
