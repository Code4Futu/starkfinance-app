import React, { useEffect, useRef } from "react";

function useImages(sources) {
  const imageRefs = useRef(sources.map(() => new Image()));

  useEffect(() => {
    sources.forEach((src, index) => {
      imageRefs.current[index].src = src;
    });
  }, [sources]);

  return imageRefs;
}
