import { ChangeEvent, useState } from "react";
import ContainerBox from "../../_components/ContainerBox";
import FileInput from "./FileInput";
import { ProductType } from "@/data-layer/product";

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
  const [mediaFiles, setMediaFiles] = useState<
    { file?: File; id?: number; url: string }[]
  >([...(product.mediaFiles || [])]);

  const handleImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedMediaFile = e.target.files?.[0];
    if (uploadedMediaFile) {
      setMediaFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.push({
          file: uploadedMediaFile,
          url: URL.createObjectURL(uploadedMediaFile),
        });
        return updatedFiles;
      });

      setUploadedMediaFiles([...uploadedMediaFiles, uploadedMediaFile]);
    }
  };

  const removeImage = (index: number) => {
    if (mediaFiles[index].file) {
      setMediaFiles((prevFiles) => {
        if (prevFiles[index] && !prevFiles[index].file) {
          URL.revokeObjectURL(prevFiles[index].url);
        }

        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });

      const updatedFiles = [...uploadedMediaFiles];
      updatedFiles.splice(index, 1);

      setUploadedMediaFiles(updatedFiles);
    } else {
      setMediaFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });

      const id = mediaFiles[index].id;
      const updatedMediaFiles = [...(product.mediaFiles || [])];
      setProduct({
        ...product,
        mediaFiles: updatedMediaFiles.filter((m) => m.id !== id),
      });
    }
  };

  return (
    <ContainerBox>
      <div className="font-semibold text-lg">Upload Img</div>
      {mediaFiles.length > 0 && (
        <FileInput
          index={0}
          image={mediaFiles[0]?.url}
          handleImageOnChange={handleImageOnChange}
          handleRemoveImage={removeImage}
          big
        />
      )}

      <div className="flex gap-2 flex-wrap">
        {[...Array(mediaFiles.length > 4 ? mediaFiles.length : 4)].map(
          (_, i) => {
            const index = mediaFiles.length > 0 ? i + 1 : i;
            return (
              <FileInput
                index={index}
                key={index}
                image={
                  mediaFiles[index]?.url ? mediaFiles[index].url : undefined
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
