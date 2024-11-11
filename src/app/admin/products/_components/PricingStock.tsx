import { Input } from "@/components/ui/input";
import ContainerBox from "../../_components/ContainerBox";
import { ProductType } from "../../data-layer/product";
import { numberOnly } from "@/utils/number-only";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/utils/slug";

const PricingStock = ({
  product,
  setProduct,
}: {
  product: ProductType;
  setProduct: (product: ProductType) => void;
}) => {
  return (
    <ContainerBox>
      <div className="font-semibold text-lg mb-2">Pricing and stock</div>
      <div className="flex gap-3">
        <div className="basis-full">
          <Label htmlFor="basePrice" className="font-medium">
            Price
          </Label>
          <Input
            onChange={(evt) =>
              setProduct({
                ...product,
                basePrice: numberOnly(evt.currentTarget.value),
              })
            }
            className="bg-white"
            id="basePrice"
            value={product.basePrice ?? ""}
            placeholder="Base pricing"
          />
        </div>
        <div className="basis-full">
          <Label htmlFor="stock" className="font-medium">
            Stock
          </Label>
          <Input
            id="stock"
            placeholder="Stock"
            className="bg-white"
            onChange={(evt) =>
              setProduct({
                ...product,
                stock: numberOnly(evt.currentTarget.value),
              })
            }
            value={product.stock ?? ""}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="basis-full">
          <Label htmlFor="discount" className="font-medium">
            Discount
          </Label>
          <Input
            onChange={(evt) =>
              setProduct({
                ...product,
                discount: numberOnly(evt.currentTarget.value),
              })
            }
            className="bg-white"
            value={product.discount ?? ""}
            placeholder="Discount"
          />
        </div>
        <div className="basis-full">
          <Label htmlFor="sku" className="font-medium">
            SKU
          </Label>
          <Input
            onChange={(evt) =>
              setProduct({
                ...product,
                sku: generateSlug(evt.currentTarget.value),
              })
            }
            id="sku"
            className="bg-white"
            value={product.sku}
            placeholder="SKU"
          />
        </div>
      </div>
    </ContainerBox>
  );
};

export default PricingStock;
