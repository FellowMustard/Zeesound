import { useState } from "react";
import Input_ from "../Input_";
import Modal_ from "../Modal_";
import AuthorSearch from "../Layout/AuthorSearch";
import FileUpload from "../FileUpload_";
import { AiFillPicture } from "react-icons/ai";
import { PiSoundcloudLogoLight } from "react-icons/pi";
import Button_ from "../Button_";
import useToast from "../../Hooks/useToast";
import { deleteImageByUrl, handleUploadStorage } from "../../api/Firebase";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import useAxiosProtect from "../../Hooks/useAxiosProtect";
import { createSong } from "../../api/link";

type modalProps = {
  onClose: () => void;
};

type dropdownOptionProps = {
  name: string;
  value: string;
  icon?: React.ReactNode;
};

function UploadModal({ onClose }: modalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [authorValue, setAuthorValue] = useState({
    name: "",
    id: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songName, setSongName] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();
  const logout = useLogout();

  const axiosProtect = useAxiosProtect();

  const handleAuthorValue = (prop: dropdownOptionProps) => {
    setAuthorValue({
      id: prop.value,
      name: prop.name,
    });
  };

  const handleSongChange = (newValue: string) => {
    setSongName(newValue);
  };
  const handleImageFileChanges = (file: File | null) => {
    setImageFile(file);
  };
  const handleSongFileChanges = (file: File | null) => {
    setSongFile(file);
  };
  const handleDeleteAuthor = () => {
    setAuthorValue({
      name: "",
      id: "",
    });
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    if (!songName || !imageFile || !songFile || !authorValue) {
      toast?.open(
        "Please Upload Files and Fill All Credentials Properly!",
        "error"
      );
      setLoading(false);
      return;
    }
    let imageLink: string = "";
    let songLink: string = "";

    try {
      const uploadImageResult = await handleUploadStorage(
        imageFile,
        "thumbnail/"
      );
      const uploadSongResult = await handleUploadStorage(songFile, "song/");
      imageLink = uploadImageResult as string;
      songLink = uploadSongResult as string;

      const response = await axiosProtect.post(createSong, {
        title: songName,
        songPath: songLink,
        imagePath: imageLink,
        authorId: authorValue.id,
      });

      console.log(response.data);
      toast?.open(response.data.message, "success");
      setLoading(false);
      navigate(`/song/${response.data.id}`);
      onClose();
    } catch (err: any) {
      if (imageLink) {
        deleteImageByUrl(imageLink);
      }
      if (songLink) {
        deleteImageByUrl(songLink);
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

  return (
    <Modal_
      title="Upload new Song"
      desc="Please fill out song details correctly."
      onClose={loading ? undefined : onClose}
    >
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 justify-center">
          <FileUpload
            id="song-thumbnail"
            restrict="image"
            icon={
              <AiFillPicture className="w-3/5 h-3/5 group-hover:animate-bounce" />
            }
            desc="Upload an Image as Thumbnail"
            handleChange={handleImageFileChanges}
          />
          <FileUpload
            id="song-audio"
            restrict="audio"
            icon={
              <PiSoundcloudLogoLight className="w-3/5 h-3/5 group-hover:animate-bounce" />
            }
            desc="Upload a Song"
            handleChange={handleSongFileChanges}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Input_
            id="Song"
            label=""
            className="bg-dark-saturated"
            placeholder="Song Name"
            onChange={handleSongChange}
          ></Input_>
          {authorValue.name ? (
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <p className="font-semibold text-dark-text text-sm">
                Author : {authorValue.name}
              </p>
              <Button_
                className="bg-dark-primary rounded-full"
                onClick={handleDeleteAuthor}
              >
                Clear
              </Button_>
            </div>
          ) : (
            <AuthorSearch handleAuthorValue={handleAuthorValue} />
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
export default UploadModal;
