import { cx } from "@/utils/cx";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

const Button = ({
  icon,
  className,
  primary,
  secondary,
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  const Icon = icon;
  return (
    <div
      className={cx(
        "px-5 py-2 rounded-full inline-flex w-auto gap-2 items-center cursor-pointer self-start",
        primary && "bg-red-200 hover:bg-red-300/70",
        secondary && "border border-gray-300 hover:bg-gray-50",
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon size={18} className={cx(secondary && "text-gray-500")} />}
      {children}
    </div>
  );
};

export default Button;
