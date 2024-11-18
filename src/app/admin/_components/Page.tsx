import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";

const Page = ({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb?: Breadcrumb;
}) => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-amber-700/75" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs breadcrumb={breadcrumb} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-5 pt-0">{children}</div>
    </>
  );
};

export default Page;