import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Tooltip_ from "../Tooltip_";
import { useNavigate } from "react-router-dom";
function Pagination() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-1">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-black transition scale-90 hover:scale-100 group"
      >
        <MdKeyboardArrowLeft className="text-2xl" />
        <Tooltip_ className="group-hover:block hidden opacity-100">
          Go Back
        </Tooltip_>
      </button>
      <button
        onClick={() => navigate(1)}
        className="p-2 rounded-full bg-black transition scale-90 hover:scale-100 group "
      >
        <MdKeyboardArrowRight className="text-2xl" />
        <Tooltip_ className="group-hover:block hidden opacity-100">
          Go Forward
        </Tooltip_>
      </button>
    </div>
  );
}

export default Pagination;
