import React from "react";
import useVisibilityAnimation from "@/lib/useVisibilityAnimation";

interface RichTextProps {
  content?: string;
  children?: React.ReactNode;
  justify?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, children, justify }) => {
  const { isVisible, elementRef } = useVisibilityAnimation(0.3);

  if (content) {
    return (
      <div
        ref={elementRef}
        className={`rich-text ${justify} ${isVisible ? "visible" : ""}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div ref={elementRef} className={`rich-text ${justify} ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default RichText;
