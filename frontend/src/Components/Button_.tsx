import { ImSpinner8 } from "react-icons/im";
type buttonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | "";
  onClick?: () => void;
  loading?: true | false;
};
function Button_({ children, type, className, onClick, loading }: buttonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading}
      className={` ${
        className ? className : ""
      } px-2 py-1 flex justify-center items-center gap-1 text-dark-text font-semibold rounded text-sm scale-95 transition hover:text-white hover:scale-100`}
    >
      {loading ? <ImSpinner8 className="animate-spin relative" /> : null}
      {children}
    </button>
  );
}

export default Button_;
