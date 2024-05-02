type CardProps = {
  children: React.ReactNode;
  className?: string | "";
  refProp?: React.Ref<HTMLDivElement> | null;
};
function Card_({ children, className, refProp }: CardProps) {
  return (
    <div
      ref={refProp}
      className={` ${
        className ? className : ""
      } p-4 rounded shadow-sm h-fit w-full bg-dark-card`}
    >
      {children}
    </div>
  );
}

export default Card_;
