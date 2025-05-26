import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const FixedSideMenu: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const containers = Array.from(document.querySelectorAll<HTMLElement>(".container[id]"));
    const newSections = containers.map((container) => ({
      id: container.id,
      label: container.getAttribute("data-label") || container.id,
    }));

    setSections(newSections);

    const handleScroll = () => {
      let currentSection = "";
      let minDifference = Infinity;

      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const offsetTop = rect.top - 90;
        const difference = Math.abs(offsetTop);

        if (difference < minDifference && rect.bottom > 0) {
          minDifference = difference;
          currentSection = container.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 90;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed-side-menu">
      <ul>
        {sections.map((section) => (
          <li key={section.id} className={activeSection === section.id ? "active" : ""}>
            <Link
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(section.id);
              }}
            >
              <span className="menu-label">{section.label}</span>
              <span className="menu-dot" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FixedSideMenu;
