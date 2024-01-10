import { useState } from "react";

const useSettingModalChart = () => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  function toggleSettingModalChart() {
    setIsSettingModalOpen(!isSettingModalOpen);
  }

  const closeSettingModalChart = () => {
    setIsSettingModalOpen(false);
  };

  return {
    isSettingModalOpen,
    toggleSettingModalChart,
    closeSettingModalChart,
  };
};

export default useSettingModalChart;
