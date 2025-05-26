import React from "react";
import RichText from "./RichText";
import ContentWrapper from "./ContentWrapper";
import useVisibilityAnimation from "@/lib/useVisibilityAnimation";

interface HeroBannerProps {
  content?: string;
  background?: string;
  backgroundImage?: string;
  imageSrc?: string;
  imageAlt?: string;
  size?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  content = "Lorem ipsum",
  background = "primary-100",
  backgroundImage,
  imageSrc,
  size = "auto",
  imageAlt = "Hero image",
}) => {
  const { isVisible, elementRef } = useVisibilityAnimation(0.3);

  return (
    <div
      ref={elementRef}
      className={`hero-banner ${background ? `bg-${background}` : ""} ${
        size ? `size-${size}` : ""
      }`}
    >
      {backgroundImage && (
        <img className="hero-background" src={backgroundImage} alt="Background" />
      )}
      <ContentWrapper>
        <div className={`hero-content ${isVisible ? "visible" : ""}`}>
          <RichText content={content} />
          {imageSrc && (
            <div className={`hero-image ${isVisible ? "visible" : ""}`}>
              <img src={imageSrc} alt={imageAlt} />
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
