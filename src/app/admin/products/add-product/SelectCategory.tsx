import Dropdown, { DropdownOption } from "@/components/form/Dropdown";
import ContainerBox from "../../_components/ContainerBox";
import { SquareX } from "lucide-react";
import InputText from "@/components/form/InputText";
import Button from "@/components/button/Button";
import { useEffect, useState } from "react";
import { getCategories } from "@/data-layer/category";
import { ProductCategory } from "@prisma/client";

const Category = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: { id?: number; title: string }[];
  setSelectedCategories: (categories: { id?: number; title: string }[]) => void;
}) => {
  const [categories, setCategories] =
    useState<Omit<ProductCategory, "shopId">[]>();
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories(1);
        if (res.length === 0) {
          throw new Error("Failed to fetch product data");
        }
        setCategories(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const onSelectCategory = (category: DropdownOption) => {
    const id = Number(category.value);
    const title = category.label;

    if (!selectedCategories.some((c) => c.id === id)) {
      setSelectedCategories([...selectedCategories, { id, title }]);
    }
  };

  const onUnselectCategory = (id: number | undefined, title: string) => {
    setSelectedCategories(
      selectedCategories.filter(
        (selected) => selected.id !== id || selected.title !== title,
      ),
    );
  };

  const onAddNewCategory = () => {
    if (newCategory.length > 2) {
      setSelectedCategories([
        ...selectedCategories,
        { id: undefined, title: newCategory },
      ]);
    }
    setNewCategory("");
  };

  return (
    <ContainerBox>
      <div className="font-semibold text-lg">Category</div>
      <Dropdown
        options={categories
          ?.filter((c) => !selectedCategories.some((s) => s.id === c.id))
          .map((category) => ({
            label: category.title,
            value: String(category.id),
          }))}
        onChange={onSelectCategory}
      />
      <div className="flex text-sm gap-2 flex-wrap">
        {selectedCategories.map((s) => (
          <div key={s.id} className="flex-shrink-0 flex-grow-0 basis-auto">
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
      <InputText
        name="category_name"
        onChange={(val) => setNewCategory(val)}
        defaultValue={newCategory}
        placeholder="Category name"
      />
      <Button primary onClick={onAddNewCategory}>
        Add new Category
      </Button>
    </ContainerBox>
  );
};

export default Category;
