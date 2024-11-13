import { Button } from "@/components/ui/button";
import { BookDashed, Check, LayoutList, Loader2 } from "lucide-react";

const Header = ({
  type,
  draft,
  changesMade,
  setSubmitInProgress,
  state,
}: {
  type: "edit" | "add";
  draft: boolean;
  changesMade: boolean;
  setSubmitInProgress: (val: boolean) => void;
  state: {
    changesMade: boolean;
    submitInProgress: boolean;
  };
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
          <Button variant="secondary" onClick={() => console.log("Save draft")}>
            <BookDashed />
            Save Draft
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => console.log("Save draft")}>
            <BookDashed />
            {draft ? "Draft" : "Published"}
          </Button>
        )}
        {changesMade && (
          <Button type="submit" disabled={state.submitInProgress}>
            {type === "add" ? "Add Product" : "Update Product"}
            {state.submitInProgress ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Check />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
