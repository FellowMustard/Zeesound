import { motion } from "framer-motion";
import useTimeout from "../Hooks/useTimeout";

type toastProps = {
  message: string;
  close: () => void;
  variant?: string;
};
function Toast_({ message, close, variant }: toastProps) {
  const toastDuration = 3000;
  let toastVariant;

  switch (variant) {
    case "error":
      toastVariant = "bg-dark-error";
      break;
    case "success":
      toastVariant = "bg-dark-success";
      break;
    default:
      toastVariant = "bg-dark-saturated";
      break;
  }

  useTimeout({ callBackFunction: close, delay: toastDuration });
  return (
    <motion.div
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      }}
      exit={{
        x: -50,
        opacity: 0,
        transition: { duration: 0.1 },
      }}
      onClick={close}
      className={`${toastVariant} text-white text-sm shadow-lg cursor-pointer w-[250px] rounded p-4 relative`}
    >
      {message}
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: "100%",
          transition: { duration: toastDuration / 1000 },
        }}
        className="bg-white h-1 rounded absolute bottom-0 left-0"
      />
    </motion.div>
  );
}

export default Toast_;
