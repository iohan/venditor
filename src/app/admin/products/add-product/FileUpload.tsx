import { ChangeEvent, useEffect, useState } from "react";
import ContainerBox from "../../_components/ContainerBox";
import FileInput from "./FileInput";

const FileUpload = () => {
  const [filesUploaded, setFilesUploaded] = useState<
    { file: File; tempUrl: string }[]
  >([]);

  const handleImageOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    console.log("File", e, index);
    const uploadedMediaFile = e.target.files?.[0];
    if (uploadedMediaFile) {
      setFilesUploaded((prevFilesUploaded) => {
        if (prevFilesUploaded[index]) {
          URL.revokeObjectURL(prevFilesUploaded[index].tempUrl);
        }

        const updatedFiles = [...prevFilesUploaded];
        updatedFiles.push({
          file: uploadedMediaFile,
          tempUrl: URL.createObjectURL(uploadedMediaFile),
        });
        return updatedFiles;
      });
    }
  };

  const removeImage = (index: number) => {
    setFilesUploaded((prevFilesUploaded) => {
      if (prevFilesUploaded[index]) {
        URL.revokeObjectURL(prevFilesUploaded[index].tempUrl);
      }
      const updatedFiles = [...prevFilesUploaded];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  useEffect(() => {
    console.log(filesUploaded);
  }, [filesUploaded]);

  return (
    <ContainerBox>
      <div className="font-semibold text-lg">Upload Img</div>
      {filesUploaded.length > 0 && (
        <FileInput
          index={0}
          image={filesUploaded[0]?.tempUrl}
          handleImageOnChange={handleImageOnChange}
          handleRemoveImage={removeImage}
          big
        />
      )}

      <div className="flex gap-2 flex-wrap">
        {[...Array(filesUploaded.length > 4 ? filesUploaded.length : 4)].map(
          (_, i) => {
            const index = filesUploaded.length > 0 ? i + 1 : i;
            return (
              <FileInput
                index={index}
                key={index}
                image={
                  filesUploaded[index]?.tempUrl
                    ? filesUploaded[index].tempUrl
                    : undefined
                }
                handleImageOnChange={handleImageOnChange}
                handleRemoveImage={removeImage}
              />
            );
          },
        )}
      </div>
    </ContainerBox>
  );

  /*return (
    <ContainerBox>
      <div className="font-semibold text-lg">Upload Img</div>
      <input
        type="file"
        name="media"
        accept="image/jpeg,image/png, image/webp, image/gif, video/mp4, video/webm"
        onChange={handleImageOnChange}
      />
      {mediaUrl && media && (
        <div className="flex-grow relative h-[300px] rounded-lg overflow-hidden">
          <img
            src={mediaUrl}
            alt="Picture of the author"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      )}
      <div className="flex gap-2">
        <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
          <Image
            src={productMan}
            alt="Picture of the author"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
          <Image
            src={productBeenie1}
            alt="Picture of the author"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
          <Image
            src={productBeenie2}
            alt="Picture of the author"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="border cursor-pointer hover:border-red-200 flex justify-center items-center border-2 border-dashed basis-1/4 aspect-square rounded-lg overflow-hidden">
          <CirclePlus className="text-amber-700" />
        </div>
      </div>
    </ContainerBox>
  );*/
};

export default FileUpload;
