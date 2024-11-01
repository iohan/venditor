import { cx } from "@/utils/cx";
import { CirclePlus } from "lucide-react";
import { ChangeEvent, useRef } from "react";

const FileInput = ({
  index,
  handleImageOnChange,
  handleRemoveImage,
  big,
  image,
}: {
  index: number;
  image: string | undefined;
  big?: true;
  handleImageOnChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  handleRemoveImage: (index: number) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (image) {
      handleRemoveImage(index);
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event) => handleImageOnChange(event, index)}
        multiple
        style={{ display: "none" }}
      />
      <div
        className={cx(
          "cursor-pointer",
          !big &&
            "group hover:border-red-200 flex justify-center items-center w-[calc(25%-6px)] aspect-square rounded-lg overflow-hidden",
          big && "flex-grow relative h-[300px] rounded-lg overflow-hidden",
          !image && "border-2 border-dashed hover:border-red-200",
          image && "relative",
        )}
        onClick={handleClick}
      >
        {image ? (
          <img
            src={image}
            className="absolute inset-0 object-cover w-full h-full"
          />
        ) : (
          <CirclePlus className="text-gray-300 group-hover:text-amber-700" />
        )}
      </div>
    </>
  );
};

export default FileInput;
