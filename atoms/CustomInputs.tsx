import { useState } from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: string[];
}

export const CustomInput = ({ label, name, type = 'text', value, onChange }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="inputWrapper">
      <label className={`label ${isFocused || value ? 'active' : ''}`}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />
    </div>
  );
};

export const CustomTextarea = ({ label, name, value, onChange }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="inputWrapper">
      <label className={`label ${isFocused || value ? 'active' : ''}`}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />
    </div>
  );
};

export const CustomSelect = ({ label, name, value, onChange, options = [] }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="inputWrapper">
      <label className={`label ${isFocused || value ? 'active' : ''}`}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      >
        <option value="" disabled>Wybierz...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
