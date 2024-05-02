import { useEffect, useRef } from "react";
import { MdOutlineClear } from "react-icons/md";
type modalProps = {
  title: string;
  desc?: string;
  children: React.ReactNode;
  onClose?: () => void;
};
function Modal_({ title, desc, children, onClose }: modalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-10 w-screen bg-black/60 backdrop-blur-sm">
      <div className="w-full h-full flex justify-center items-center">
        <section
          ref={modalRef}
          className=" bg-gradient-to-b from-dark-card to-dark-saturated rounded p-2 sm:p-4 shadow-xl w-full sm:w-[450px] mx-4 sm:mx-0 relative"
        >
          <p className="tracking-tight font-semibold text-lg">{title}</p>
          <button
            onClick={onClose}
            className="top-3 right-4 absolute text-dark-text hover:text-white"
          >
            <MdOutlineClear />
          </button>
          <span className="text-sm text-gray-500">{desc}</span>
          <div>{children}</div>
        </section>
      </div>
    </div>
  );
}

export default Modal_;
