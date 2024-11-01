import { cx } from "@/utils/cx";

const InputText = ({
  name,
  label,
  className,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (val: string | null) => void;
}) => {
  return (
    <div className="flex flex-col gap-1 basis-full">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        type="text"
        onChange={(e) =>
          onChange && onChange(e.target.value === "" ? null : e.target.value)
        }
        value={value ?? ""}
        className={cx(
          "bg-gray-200 rounded-lg text-sm text-gray-800 p-3 outline-none",
          className,
        )}
      />
    </div>
  );
};

export default InputText;
