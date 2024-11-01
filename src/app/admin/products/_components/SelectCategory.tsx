import Dropdown, { DropdownOption } from "@/components/form/Dropdown";
import ContainerBox from "../../_components/ContainerBox";
import { SquareX } from "lucide-react";
import NewCategory from "./NewCategory";
import { Category as CategoryType } from "@prisma/client";
import { ProductType } from "@/data-layer/product";

interface CategoryProps {
  categories: CategoryType[];
  product: ProductType;
  setProduct: (product: ProductType) => void;
}

const Category = ({ categories, product, setProduct }: CategoryProps) => {
  const selectedCategories = product.selectedCategories;

  const onSelectCategory = (category: DropdownOption) => {
    const id = Number(category.value);
    const title = category.label;

    if (!selectedCategories?.some((c) => c.id === id)) {
      setProduct({
        ...product,
        selectedCategories: [
          ...(product.selectedCategories || []),
          { id, title },
        ],
      });
    }
  };

  const onUnselectCategory = (id: number | undefined, title: string) => {
    setProduct({
      ...product,
      selectedCategories: selectedCategories?.filter(
        (selected) => selected.id !== id || selected.title !== title,
      ),
    });
  };

  const onAddNewCategory = (newCategory: string) => {
    if (newCategory.length > 2) {
      setProduct({
        ...product,
        selectedCategories: [
          ...(product.selectedCategories || []),
          { id: undefined, title: newCategory },
        ],
      });
    }
  };

  return (
    <ContainerBox>
      <div className="font-semibold text-lg">Category</div>
      <Dropdown
        options={categories
          .filter((c) => !selectedCategories?.some((s) => s.id === c.id))
          .map((category) => ({
            label: category.title,
            value: String(category.id),
          }))}
        onChange={onSelectCategory}
      />
      <div className="flex text-sm gap-2 flex-wrap">
        {selectedCategories?.map((s, i) => (
          <div
            key={s.id ? s.id : `unsaved_${i}`}
            className="flex-shrink-0 flex-grow-0 basis-auto"
          >
            <div
              className="flex items-center gap-x-1 hover:underline cursor-pointer"
              onClick={() => onUnselectCategory(s.id, s.title)}
            >
              <span>{s.title}</span>
              <SquareX className="text-amber-700" size={13} />
            </div>
          </div>
        ))}
      </div>
      <NewCategory onAdd={(category: string) => onAddNewCategory(category)} />
    </ContainerBox>
  );
};

export default Category;
