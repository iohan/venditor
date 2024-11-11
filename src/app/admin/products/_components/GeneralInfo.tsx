import ContainerBox from "../../_components/ContainerBox";
import { generateSlug } from "@/utils/slug";
import { ProductType } from "@/app/admin/data-layer/product";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

const GeneralInfo = ({
  product,
  setProduct,
}: {
  product: ProductType;
  setProduct: (product: ProductType) => void;
}) => {
  return (
    <ContainerBox>
      <div className="font-semibold text-lg mb-2">General Information</div>
      <div>
        <Label htmlFor="productName" className="font-medium">
          Product name
        </Label>
        <Input
          className="bg-white"
          id="productName"
          placeholder="Product name"
          value={`${product.title}`}
          onChange={(evt) =>
            setProduct({
              ...product,
              title: evt.currentTarget.value,
              sku: generateSlug(evt.currentTarget.value),
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="description">Product description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Product description"
          value={product.description}
          className="h-64 bg-white"
          onChange={(evt) =>
            setProduct({ ...product, description: evt.currentTarget.value })
          }
        />
      </div>
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
