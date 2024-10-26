import { cx } from "@/utils/cx";

const InputText = ({
  label,
  className,
  placeholder,
}: {
  label?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-1 basis-full">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        type="text"
        className={cx(
          "bg-gray-200 rounded-lg text-sm text-gray-800 p-3 outline-none",
          className,
        )}
      />
    </div>
  );
};

export default InputText;
