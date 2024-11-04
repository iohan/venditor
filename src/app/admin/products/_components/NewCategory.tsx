import Button from "@/components/button/Button";
import InputText from "@/components/form/InputText";
import { useState } from "react";

const NewCategory = ({ onAdd }: { onAdd: (category: string) => void }) => {
  const [newCategory, setNewCategory] = useState<string>("");

  return (
    <>
      <InputText
        onChange={(val) => setNewCategory(String(val))}
        placeholder="Category name"
        value={newCategory}
      />
      <Button primary onClick={() => onAdd(newCategory)}>
        Add new Category
      </Button>
    </>
  );
};

export default NewCategory;
