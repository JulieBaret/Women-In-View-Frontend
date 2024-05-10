import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  placeholderSrc,
  src,
  alt,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("");
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      // Set actual image source && unobserve when intersecting
      if (entries[0].isIntersecting) {
        setView(src);
        observer.unobserve(placeholderRef.current);
      }
    });

    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);

  return (
    <>
      {isLoading && (
        <img
          src={placeholderSrc}
          alt="placeholder"
          className="bg-gray-300"
          ref={placeholderRef}
        />
      )}
      <img
        src={view}
        className={isLoading && "hidden"}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};
export default LazyImage;