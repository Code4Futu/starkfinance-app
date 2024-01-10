import { useState } from "react";

const useModalChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModalChart() {
    setIsModalOpen(!isModalOpen);
  }

  return {
    isModalOpen,
    toggleModalChart,
  };
};

export default useModalChart;
