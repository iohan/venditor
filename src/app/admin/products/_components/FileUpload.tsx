import { ChangeEvent, useEffect, useState } from "react";
import ContainerBox from "../../_components/ContainerBox";
import FileInput from "./FileInput";
import { ProductType } from "@/data-layer/product";

// TODO: Use product.mediaFiles when showing and removing media files

const FileUpload = ({
  product,
  setProduct,
  uploadedMediaFiles,
  setUploadedMediaFiles,
}: {
  product: ProductType;
  setProduct: (product: ProductType) => void;
  uploadedMediaFiles: File[];
  setUploadedMediaFiles: (files: File[]) => void;
}) => {
  const [filesUploaded, setFilesUploaded] = useState<
    { file: File; tempUrl: string }[]
  >([]);

  const handleImageOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
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

      setUploadedMediaFiles([...uploadedMediaFiles, uploadedMediaFile]);
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

    const updatedFiles = [...uploadedMediaFiles];
    updatedFiles.splice(index, 1);

    setUploadedMediaFiles(updatedFiles);
  };

  useEffect(() => {}, [filesUploaded]);

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
};

export default FileUpload;
