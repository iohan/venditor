import Button from "@/components/button/Button";
import { BookDashed, Check, LayoutList } from "lucide-react";

const Header = ({
  type,
  draft,
  changesMade,
}: {
  type: "edit" | "add";
  draft: boolean;
  changesMade: boolean;
}) => {
  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-2 items-center">
        <LayoutList size={20} className="text-amber-700/75" />
        <div className="text-xl font-semibold">
          {type === "add" ? `Add new product` : `Edit product`}
        </div>
      </div>
      <div className="flex gap-3">
        {type === "add" ? (
          <Button
            secondary
            icon={BookDashed}
            onClick={() => console.log("Save draft")}
          >
            Save Draft
          </Button>
        ) : (
          <Button
            secondary
            icon={BookDashed}
            onClick={() => console.log("Save draft")}
          >
            {draft ? "Draft" : "Published"}
          </Button>
        )}
        {changesMade && (
          <Button primary icon={Check} type="submit">
            {type === "add" ? "Add Product" : "Update Product"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
