import { Link, useLocation } from "react-router-dom";

type linkProps = {
  path: string;
  children: React.ReactNode;
  icon?: React.ReactNode | null;
  className?: string | null;
};
function Link_({ path, children, icon, className }: linkProps) {
  const location = useLocation();
  return (
    <Link to={path}>
      <span
        className={`${className} flex gap-2 items-center font-semibold text-lg ${
          location.pathname === path
            ? "text-white"
            : "text-dark-text hover:text-white "
        }`}
      >
        {icon}
        {children}
      </span>
    </Link>
  );
}

export default Link_;
