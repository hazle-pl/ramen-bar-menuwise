import React, { useState } from "react";
import Head from "next/head";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  faq?: FAQItem;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {faq && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer,
                    },
                  },
                ],
              }),
            }}
          />
        </Head>
      )}
      <div className={`accordion ${isOpen ? "open" : ""}`}>
        <div className="accordion-header" onClick={toggleAccordion}>
          <h3>{title}</h3>
          <i className="fa-solid fa-chevron-down"/>
        </div>
        {isOpen && <div className="accordion-content">{children}</div>}
      </div>
    </>
  );
};

export default Accordion;
