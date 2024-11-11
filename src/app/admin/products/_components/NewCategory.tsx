import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewCategory = ({ onAdd }: { onAdd: (category: string) => void }) => {
  const [newCategory, setNewCategory] = useState<string>("");

  return (
    <>
      <Input
        onChange={(evt) => setNewCategory(evt.currentTarget.value)}
        placeholder="Category name"
        className="bg-white"
        value={newCategory}
      />
      <Button onClick={() => onAdd(newCategory)}>Add new Category</Button>
    </>
  );
};

export default NewCategory;
