import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { deleteProducts } from "../data-layer/product";

const ContextActions = ({ productId }: { productId: number }) => {
  const { showAlert } = useAlertDialog();

  const deleteProduct = () => {
    showAlert({
      title: "Are you sure you want to delete this product?",
      description:
        "This action cannot be undone. This will permanently delete your product and remove your data from the database.",
      onConfirm: async () => {
        await deleteProducts({
          shopId: 1,
          productIds: [productId],
          pathToRevalidate: "/admin/products",
        });
      },
      confirmText: "Delete",
      cancelText: "Cancel",
    });
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={deleteProduct}>
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContextActions;
