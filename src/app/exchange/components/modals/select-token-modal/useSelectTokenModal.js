import { useState } from "react";

const useSelectTokenModal = () => {
  const [isSelectTokenModalOpen, setIsSelectTokenModalOpen] = useState(false);

  function toggleSelectTokenModalChart() {
    setIsSelectTokenModalOpen(!isSelectTokenModalOpen);
  }

  return {
    isSelectTokenModalOpen,
    toggleSelectTokenModalChart,
  };
};

export default useSelectTokenModal;
