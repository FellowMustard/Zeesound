import useAuth from "../../Hooks/useAuth";
import useModal from "../../Hooks/useModal";
import Card_ from "../Card_";
import { BsMusicNoteList, BsPlus } from "react-icons/bs";
import Dropdown_ from "../Dropdown_";
import { useEffect, useRef, useState } from "react";
import { PiMusicNotesPlusFill, PiMusicNoteFill } from "react-icons/pi";

function Library() {
  const { auth } = useAuth();
  const { openModal } = useModal();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const dropDownOptions = [
    { name: "Upload new Song", value: "upload", icon: <PiMusicNoteFill /> },
    {
      name: "Create new Playlist",
      value: "create",
      icon: <PiMusicNotesPlusFill />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = (state: boolean) => {
    setDropdown(state);
  };

  const handleCreate = () => {
    if (auth?.token) {
      handleDropdown(!dropdown);
    } else {
      openModal("Limited_Modal");
    }
  };

  const handleDropdownOption = (action: string) => {
    console.log(action);
    switch (action) {
      case "upload":
        openModal("Upload_Modal");
        break;
      case "create":
        break;
      default:
        break;
    }
  };

  return (
    <Card_ className="flex-1">
      <div className="flex justify-between items-center">
        <span className="flex gap-3 text-dark-text hover:text-white items-center cursor-pointer font-semibold text-lg">
          <BsMusicNoteList />
          Library
        </span>
        <Dropdown_
          onClick={handleCreate}
          open={dropdown}
          mRef={dropdownRef}
          dropDowns={dropDownOptions}
          handleAction={handleDropdownOption}
        >
          <BsPlus className=" text-dark-text hover:text-white cursor-pointer font-bold text-xl " />
        </Dropdown_>
      </div>
    </Card_>
  );
}

export default Library;
