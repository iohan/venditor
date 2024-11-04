import { cx } from "@/utils/cx";

const InputText = ({
  label,
  className,
  placeholder,
  value,
  onChange,
}: {
  label?: string;
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange: (val: string | undefined) => void;
}) => {
  return (
    <div className="flex flex-col gap-1 basis-full">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        type="text"
        onChange={(e) =>
          onChange &&
          onChange(e.target.value === "" ? undefined : e.target.value)
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
