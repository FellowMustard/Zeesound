import { useEffect, useState } from "react";
import Dropdown_ from "../Dropdown_";
import Input_ from "../Input_";
import useDebounce from "../../Hooks/useDebounce";
import useAxiosProtect from "../../Hooks/useAxiosProtect";
import { findAuthor } from "../../api/link";
import { HiUserAdd } from "react-icons/hi";
import useModal from "../../Hooks/useModal";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";

type dropdownOptionProps = {
  name: string;
  value: string;
  icon?: React.ReactNode;
  iamge?: string;
};

type authorSearchProps = {
  handleAuthorValue: (prop: dropdownOptionProps) => void;
};

function AuthorSearch({ handleAuthorValue }: authorSearchProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [authorInput, setAuthorInput] = useState<string>("");
  const [authorDropdownData, setAuthorDropdownData] = useState<
    dropdownOptionProps[]
  >([]);

  //Debounce Custom Hook
  const debounceAuthor = useDebounce({ value: authorInput, delay: 1000 });
  const axiosProtect = useAxiosProtect();
  const { openModal } = useModal();

  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    if (debounceAuthor) {
      searchAuthor(debounceAuthor);
    }
  }, [debounceAuthor]);

  const handleAuthorChange = (newValue: string) => {
    setAuthorInput(newValue);
  };

  const handleAuthorPick = (action: string, name?: string) => {
    if (name)
      handleAuthorValue({
        value: action,
        name,
      });
  };

  const searchAuthor = async (name: string) => {
    setLoading(true);
    try {
      const response = await axiosProtect.get(findAuthor(name), {});
      const mappedData = response.data.map((author: any) => ({
        name: author.name,
        value: author._id,
        image: author.pic,
      }));
      setAuthorDropdownData(mappedData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Input_
        id="Author"
        label=""
        className="bg-dark-saturated"
        placeholder="Author Name"
        onChange={handleAuthorChange}
      ></Input_>
      <Dropdown_
        className="w-full shadow-lg"
        open={debounceAuthor}
        dropDowns={authorDropdownData}
        wide
        loading={loading}
        handleAction={handleAuthorPick}
        footer={
          <p
            className="p-2 text-left hover:bg-white/15 flex gap-2 items-center"
            onClick={() => openModal("Author_Modal")}
          >
            <HiUserAdd />
            Create New Author
          </p>
        }
      ></Dropdown_>
    </>
  );
}

export default AuthorSearch;
