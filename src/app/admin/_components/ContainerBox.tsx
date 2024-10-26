import { cx } from "@/utils/cx";
import { ReactNode } from "react";

const ContainerBox = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cx(
        "flex flex-col gap-3 p-5 bg-gray-100 rounded-xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContainerBox;
