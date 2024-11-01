import { cx } from "@/utils/cx";
import { CirclePlus } from "lucide-react";
import { ChangeEvent, useRef } from "react";

const FileInput = ({
  index,
  handleImageChange,
  image,
}: {
  index: number;
  image: string | undefined;
  handleImageChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log("Open", index);
    fileInputRef.current?.click();
  };

  console.log(image);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event) => handleImageChange(event, index)}
        multiple
        style={{ display: "none" }}
      />
      <div
        key={index}
        className={cx(
          "group border cursor-pointer hover:border-red-200 flex justify-center items-center border-2 border-dashed w-[calc(25%-6px)] aspect-square rounded-lg overflow-hidden",
          image && "relative",
        )}
        onClick={handleClick}
      >
        {image ? (
          <img
            src={image}
            alt="Picture of the author"
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
