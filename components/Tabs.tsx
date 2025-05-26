import React, { useState } from "react";

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-titles">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`tab-title ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-contents">
        {children.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${activeIndex === index ? "active" : ""}`}
          >
            {activeIndex === index && tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Tabs, Tab };
