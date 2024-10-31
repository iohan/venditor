import { cx } from "@/utils/cx";

const InputText = ({
  defaultValue,
  name,
  label,
  className,
  placeholder,
  onChange,
}: {
  defaultValue?: string;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1 basis-full">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={cx(
          "bg-gray-200 rounded-lg text-sm text-gray-800 p-3 outline-none",
          className,
        )}
      />
    </div>
  );
};

export default InputText;
