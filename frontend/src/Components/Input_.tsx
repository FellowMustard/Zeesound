import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Tooltip_ from "./Tooltip_";

type inputProps = {
  id: string;
  className?: string | "";
  label?: string;
  onChange?: (value: string) => void | undefined;
  showEye?: boolean | false;
  type?: "password" | "text";
  placeholder?: string | "";
  valid?: true | false;
  errorMessage?: React.ReactNode;
};

function Input_({
  id,
  className,
  label,
  onChange,
  showEye,
  type,
  placeholder,
  valid,
  errorMessage,
}: inputProps) {
  const [inputType, setInputType] = useState<string | undefined>(type);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const handleEye = () => {
    setInputType((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };
  return (
    <div className={`${className ? className : ""} relative`}>
      {label && (
        <label className="text-sm font-semibold" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={inputType}
        id={id}
        autoComplete="off"
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        className=" w-full rounded outline-none border bg-transparent border-gray-400 p-2 focus:border-white"
        placeholder={placeholder}
      ></input>
      {inputFocus && !valid && errorMessage ? (
        <Tooltip_>{errorMessage}</Tooltip_>
      ) : null}
      {showEye ? (
        <button
          type="button"
          className="absolute bottom-3 right-3 text-white"
          onClick={() => handleEye()}
        >
          {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
        </button>
      ) : null}
    </div>
  );
}

export default Input_;
