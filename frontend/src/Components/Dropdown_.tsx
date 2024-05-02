import React from "react";
import { ImSpinner8 } from "react-icons/im";

type dropdownProps = {
  children?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  onClick?: () => void | null;
  className?: string;
  open?: boolean;
  mRef?: React.Ref<HTMLButtonElement> | null;
  dropDowns?: dropdownOptionProps[];
  handleAction?: (action: string, name?: string) => void;
  wide?: boolean | false;
  loading?: boolean | false;
};

type dropdownOptionProps = {
  name: string;
  value: string;
  icon?: React.ReactNode;
  emoji?: string;
  image?: string;
};

function Dropdown_({
  children,
  footer,
  className,
  open,
  onClick,
  mRef,
  dropDowns,
  handleAction,
  wide,
  loading,
}: dropdownProps) {
  return (
    <button
      className={`${className ? className : ""} relative`}
      onClick={onClick}
      ref={mRef}
    >
      {children}
      {open && (
        <ul
          className={`sm:absolute sm:mt-2 p-1 fixed top-0 mt-0  shadow-md bg-black text-sm rounded z-[100] left-0 max-h-[200px] overflow-y-auto ${
            wide ? "w-full" : "w-max"
          }`}
        >
          {dropDowns && dropDowns?.length > 0 ? (
            dropDowns.map((dropDown) => {
              return (
                <li
                  key={dropDown.value}
                  className="p-2 text-left hover:bg-white/15 flex gap-2 items-center"
                  onClick={
                    handleAction
                      ? () => handleAction(dropDown.value, dropDown.name)
                      : undefined
                  }
                >
                  {dropDown.image && (
                    <img
                      src={dropDown.image}
                      className="w-8 h-8 object-cover hidden sm:block "
                    ></img>
                  )}
                  {dropDown.icon && dropDown.icon}
                  {dropDown.emoji && (
                    <span className="mx-0.5">{dropDown.emoji}</span>
                  )}
                  {dropDown.name}
                </li>
              );
            })
          ) : loading ? (
            <li className="p-2 text-left hover:bg-white/15 flex gap-2 items-center ">
              <ImSpinner8 className="animate-spin relative" />
              Loading
            </li>
          ) : (
            <li className="p-2 text-left hover:bg-white/15 flex gap-2 items-center">
              No Data Found.
            </li>
          )}
          {footer}
        </ul>
      )}
    </button>
  );
}

export default Dropdown_;
