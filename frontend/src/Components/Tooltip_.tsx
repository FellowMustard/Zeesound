type tooltipProps = {
  children: React.ReactNode;
  className?: string | "";
};
function Tooltip_({ children, className }: tooltipProps) {
  return (
    <div
      className={`${
        className ? className : ""
      } text-xs text-white relative center-here  left-1/2 -translate-x-1/2 z-[100]`}
    >
      <div className=" shadow-2xl w-max  left-1/2 -translate-x-1/2 bg-dark-saturated absolute rounded p-2 my-3">
        {children}
      </div>
    </div>
  );
}

export default Tooltip_;
