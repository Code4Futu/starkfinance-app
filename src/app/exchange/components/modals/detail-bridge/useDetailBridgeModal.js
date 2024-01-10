import { useState } from "react";

const useDetailBridgeModal = () => {
  const [isDetailBridgeModalOpen, setIsDetailBridgeModalOpen] = useState(false);

  function toggleDetailBridgeModal() {
    setIsDetailBridgeModalOpen(!isDetailBridgeModalOpen);
  }

  return {
    isDetailBridgeModalOpen,
    toggleDetailBridgeModal,
  };
};

export default useDetailBridgeModal;
