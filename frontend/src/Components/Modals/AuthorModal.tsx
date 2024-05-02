import FileUpload from "../FileUpload_";
import Modal_ from "../Modal_";
import { HiMiniUserCircle } from "react-icons/hi2";
import Input_ from "../Input_";
import CountrySearch from "../Layout/CountrySearch";
import { useState } from "react";
import Button_ from "../Button_";
import useToast from "../../Hooks/useToast";
import { deleteImageByUrl, handleUploadStorage } from "../../api/Firebase";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import useAxiosProtect from "../../Hooks/useAxiosProtect";
import { createAuthor } from "../../api/link";

type modalProps = {
  onClose: () => void;
};
type dropdownOptionProps = {
  name: string;
  value: string;
  icon?: React.ReactNode;
};

function AuthorModal({ onClose }: modalProps) {
  const [countryValue, setCountryValue] = useState({
    name: "",
    id: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const axiosProtect = useAxiosProtect();

  const navigate = useNavigate();
  const logout = useLogout();

  const handleCountryValue = (prop: dropdownOptionProps) => {
    console.log(prop);
    setCountryValue({
      id: prop.value,
      name: prop.name,
    });
  };

  const handleAuthorChange = (newValue: string) => {
    setAuthor(newValue);
  };

  const handleDeleteCountry = () => {
    setCountryValue({
      name: "",
      id: "",
    });
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    if (!author || !imageFile || !countryValue) {
      toast?.open(
        "Please Upload an Image and Fill All Credentials Properly!",
        "error"
      );
      setLoading(false);
      return;
    }

    let imageLink: string = "";

    try {
      console.log("aaa");
      const uploadResult = await handleUploadStorage(imageFile, "author/");
      imageLink = uploadResult as string;
      const response = await axiosProtect.post(createAuthor, {
        name: author,
        country: countryValue.name,
        countryFlag: countryValue.id,
        pic: imageLink,
      });
      console.log(response.data);
      toast?.open(response.data.message, "success");
      setLoading(false);
      onClose();
    } catch (err: any) {
      if (imageLink) {
        deleteImageByUrl(imageLink);
      }
      if (!err?.response) {
        toast?.open(err, "error");
      } else {
        const { status } = err.response;
        if (status === 401 || status === 403) {
          console.error(err);
          logout();
          navigate("/login", { replace: true });
        } else {
          toast?.open(err.response.data.message, "error");
        }
      }
      setLoading(false);
    }
  };

  const handleFileChanges = (file: File | null) => {
    setImageFile(file);
  };

  return (
    <Modal_
      title="Create new Author"
      desc="Please fill out author details correctly."
      onClose={loading ? undefined : onClose}
    >
      <div className="flex gap-2 mt-4">
        <FileUpload
          handleChange={handleFileChanges}
          id="author-pic"
          restrict="image"
          icon={
            <HiMiniUserCircle className="w-3/5 h-3/5 group-hover:animate-bounce" />
          }
          desc="Upload an Image for Author"
        />
        <div className="flex-1 flex flex-col gap-2">
          <Input_
            id="Author"
            label=""
            className="bg-dark-saturated"
            placeholder="Author Name"
            onChange={handleAuthorChange}
          ></Input_>
          {countryValue.name ? (
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <p className="font-semibold text-dark-text ">
                Country : {countryValue.id}
                {countryValue.name}
              </p>
              <Button_
                className="bg-dark-primary rounded-full"
                onClick={handleDeleteCountry}
              >
                Clear
              </Button_>
            </div>
          ) : (
            <CountrySearch handleCountryValue={handleCountryValue} />
          )}
        </div>
      </div>
      <Button_
        className="ml-auto bg-dark-primary rounded-full"
        onClick={handleSubmit}
        loading={loading}
      >
        Submit
      </Button_>
    </Modal_>
  );
}

export default AuthorModal;
