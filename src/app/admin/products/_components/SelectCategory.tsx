import Dropdown, { DropdownOption } from "@/components/form/Dropdown";
import ContainerBox from "../../_components/ContainerBox";
import { SquareX } from "lucide-react";
import NewCategory from "./NewCategory";
import { Category as CategoryType } from "@prisma/client";
import { ProductType } from "@/app/admin/data-layer/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryProps {
  categories: CategoryType[];
  product: ProductType;
  setProduct: (product: ProductType) => void;
}

const Category = ({ categories, product, setProduct }: CategoryProps) => {
  const selectedCategories = product.selectedCategories;

  const onSelectCategory = (selectedId: string) => {
    const selectedCategory = categories.find(
      (c) => c.id === Number(selectedId),
    );

    if (!selectedCategory) {
      return;
    }

    const { id, title } = selectedCategory;

    if (selectedCategories?.some((c) => c.id === Number(selectedId))) {
      setProduct({
        ...product,
        selectedCategories: selectedCategories.filter(
          (c) => c.id !== Number(selectedId),
        ),
      });
    } else {
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
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              selected={selectedCategories?.some((s) => s.id === category.id)}
              value={String(category.id)}
            >
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
