import InputText from "@/components/form/InputText";
import ContainerBox from "../../_components/ContainerBox";
import TextArea from "@/components/form/TextArea";
import { NewProduct } from "./AddProductForm";
import { generateSku } from "@/utils/sku";

const GeneralInfo = ({
  product,
  setProduct,
}: {
  product: NewProduct;
  setProduct: (product: NewProduct) => void;
}) => {
  return (
    <ContainerBox>
      <div className="font-semibold text-lg mb-2">General Information</div>
      <InputText
        label="Product name"
        name="name"
        placeholder="Product name"
        value={`${product?.title}`}
        onChange={(val) =>
          setProduct({
            ...product,
            title: String(val),
            sku: generateSku(String(val)),
          })
        }
      />
      <TextArea
        name="description"
        label="Product description"
        placeholder="Product description"
        onChange={(val) => setProduct({ ...product, description: val ?? "" })}
      />
      <div className="flex gap-5">
        <div className="basis-full flex justify-center items-center text-gray-500 font-semibold animate-pulse bg-gray-200 rounded-lg h-20">
          <span>Additional setting</span>
        </div>
        <div className="basis-full flex justify-center items-center text-gray-500 font-semibold animate-pulse bg-gray-200 rounded-lg h-20">
          <span>Additional setting</span>
        </div>
        <div className="basis-full flex justify-center items-center text-gray-500 font-semibold animate-pulse bg-gray-200 rounded-lg h-20">
          <span>Additional setting</span>
        </div>
      </div>
    </ContainerBox>
  );
};

export default GeneralInfo;
