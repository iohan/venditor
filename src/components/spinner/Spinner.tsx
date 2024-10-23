import { cx } from "@/utils/cx";
import { Loader } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="animate-spin-slow">
      <Loader className={cx("text-red-300", className)} />
    </div>
  );
};

export default Spinner;
