import { cx } from "@/utils/cx";

const TextArea = ({
  name,
  label,
  className,
  placeholder,
  defaultValue,
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}) => {
  return (
    <div className="flex flex-col gap-1 basis-full">
      <label className="font-medium">{label}</label>
      <textarea
        className={cx(
          "bg-gray-200 min-h-40 rounded-lg text-sm text-gray-800 p-3 outline-none w-full",
          className,
        )}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default TextArea;
