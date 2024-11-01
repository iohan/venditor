import Button from "@/components/button/Button";
import InputText from "@/components/form/InputText";
import { useState } from "react";

const NewCategory = ({ onAdd }: { onAdd: (category: string) => void }) => {
  const [newCategory, setNewCategory] = useState<string>("");

  return (
    <>
      <InputText
        name="category_name"
        onChange={(val) => setNewCategory(val)}
        placeholder="Category name"
      />
      <Button primary onClick={() => onAdd(newCategory)}>
        Add new Category
      </Button>
    </>
  );
};

export default NewCategory;
