import { Link } from "react-router-dom";
import Modal_ from "../Modal_";
import Button_ from "../Button_";
type modalProps = {
  onClose: () => void;
};
function LimitedModal({ onClose }: modalProps) {
  return (
    <Modal_ title="" onClose={onClose}>
      <p className="text-center text-2xl font-bold py-4 px-8">
        Start exploring and listening with new{" "}
        <span className="zeesound">Zeesound</span> Account
      </p>
      <Link to="/register" className=" mx-auto w-fit block" onClick={onClose}>
        <Button_ className="bg-dark-primary px-8 py-4 rounded-full h-full">
          Create new account
        </Button_>
      </Link>
      <p className="mt-4 text-sm text-dark-text text-center">
        Already have an Account?
        <Link
          to="/login"
          className="font-bold cursor-pointer hover:underline"
          onClick={onClose}
        >
          {" "}
          Login here
        </Link>
      </p>
    </Modal_>
  );
}

export default LimitedModal;
