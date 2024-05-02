import React, { useState } from "react";
import useToast from "../Hooks/useToast";
import Button_ from "./Button_";
import { BsFillTrashFill } from "react-icons/bs";
import { FaCircleCheck, FaFileCircleCheck } from "react-icons/fa6";

type fileUploadProps = {
  handleChange: (file: File | null) => void;
  id: string;
  restrict: "image" | "audio";
  icon?: React.ReactNode;
  desc?: string;
};

function FileUpload({
  id,
  restrict,
  icon,
  desc,
  handleChange,
}: fileUploadProps) {
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const toast = useToast();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      const fileType = file.type.split("/");
      if (file && fileType[0] === restrict) {
        if (restrict === "image") {
          setImage(URL.createObjectURL(file));
        }
        setUploaded(true);
        handleChange(file);
      } else {
        toast?.open(`Wrong Format, Acceptable Format: ${restrict}`, "error");
      }
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    handleChange(null);
    setImage("");
    setUploaded(false);
  };

  return (
    <div
      className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded bg-dark-card shadow-xl"
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        id={id}
        type="file"
        className="hidden"
        accept={`${restrict}/*`}
        onChange={handleInput}
      ></input>
      <>
        {uploaded ? (
          image ? (
            <div className="hover:cursor-pointer group relative w-full h-full">
              <img
                className="w-full h-full object-cover rounded-md"
                src={image}
              />
              <Button_
                className="top-1 right-1 block sm:hidden group-hover:block rounded-full w-8 h-8 p-0 absolute bg-dark-primary"
                onClick={handleDelete}
              >
                <BsFillTrashFill />
              </Button_>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col p-2 justify-center items-center group relative">
              <FaCircleCheck />
              <p className="text-xs text-center">File Successfully Uploaded</p>
              <Button_
                className="top-1 right-1 block sm:hidden group-hover:block rounded-full w-8 h-8 p-0 absolute bg-dark-primary"
                onClick={handleDelete}
              >
                <BsFillTrashFill />
              </Button_>
            </div>
          )
        ) : (
          <label
            htmlFor={id}
            className="w-full h-full cursor-pointer flex flex-col p-2 justify-center items-center group"
          >
            {icon}
            {desc ? <p className="text-xs text-center">{desc}</p> : null}
          </label>
        )}
      </>
    </div>
  );
}

export default FileUpload;
