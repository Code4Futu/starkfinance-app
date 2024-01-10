import { useState } from "react";

const useModalChartBar = () => {
  const [isModalCharBarOpen, setIsModalCharBarOpen] = useState(false);

  function toggleModalChartBar() {
    setIsModalCharBarOpen(!isModalCharBarOpen);
  }

  return {
    isModalCharBarOpen,
    toggleModalChartBar,
  };
};

export default useModalChartBar;
