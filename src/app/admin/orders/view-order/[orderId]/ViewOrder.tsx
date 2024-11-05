import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, Pencil } from "lucide-react";

const ViewOrder = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="text-2xl">Order: 8945</div>
        <div className="basis-auto flex items-center gap-2">
          <Badge variant={"pending"}>Payment pending</Badge>
          <Badge variant={"declined"}>Unfullfilled</Badge>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <Button size={"sm"} variant={"secondary"}>
            Restock
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Pencil /> Edit
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            More actions <ChevronDown size={15} />
          </Button>
          <Button size={"sm"} variant={"secondary"} className="text-gray-400">
            <ChevronLeft />
          </Button>
          <Button size={"sm"} variant={"secondary"} className="text-gray-400">
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="text-sm mt-1 text-gray-500">January 8, 2024 11:24</div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ViewOrder;
