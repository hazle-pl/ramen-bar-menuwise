import React, { useState, useEffect } from "react";

interface CustomInputProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  type?: "text" | "number";
  className?: string;
}

const CustomInput = <T extends string | number>({
  value,
  onChange,
  placeholder = "Wpisz wartość",
  type = "text",
  className = "",
}: CustomInputProps<T>) => {
  const [inputValue, setInputValue] = useState<T>(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (type === "number") {
      val = Math.max(0, Number(val)).toString();
    }

    setInputValue(val as T);
    onChange(val as T);
  };

  const increment = () => {
    if (typeof inputValue === "number") {
      const newVal = (inputValue + 1) as T;
      setInputValue(newVal);
      onChange(newVal);
    }
  };

  const decrement = () => {
    if (typeof inputValue === "number") {
      const newVal = Math.max(0, (inputValue as number) - 1);
      setInputValue(newVal as T);
      onChange(newVal as T);
    }
  };

  const isFloating = isFocused || (inputValue !== "" && inputValue !== null);

  return (
    <div className={`custom-input-wrapper ${className}`}>
      {type === "number" && (
        <button type="button" className="custom-input-decrement" onClick={decrement}>−</button>
      )}
      <input
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`custom-input-field ${type === "number" ? "number" : ""}`}
      />
      {type === "number" && (
        <button type="button" className="custom-input-increment" onClick={increment}>+</button>
      )}
      <label className={`custom-input-label ${isFloating ? "floating" : ""}`}>
        {placeholder}
      </label>
    </div>
  );
};

export default CustomInput;
