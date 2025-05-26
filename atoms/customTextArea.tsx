import React, { useState, useEffect } from "react";

interface CustomTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value,
  onChange,
  placeholder = "Wpisz opis",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState(value);

  useEffect(() => {
    setTextareaValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextareaValue(newValue);
    onChange(newValue);
  };

  const isFloating = isFocused || textareaValue !== "";

  return (
    <div className={`custom-textarea-wrapper ${className}`}>
      <textarea
        value={textareaValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="custom-textarea-field"
        rows={4}
      />
      <label className={`custom-textarea-label ${isFloating ? "floating" : ""}`}>
        {placeholder}
      </label>
    </div>
  );
};

export default CustomTextArea;
