import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface Breadcrumb {
  currentPage: string;
  tree?: {
    title: string;
    href: string;
  }[];
}
const Breadcrumbs = ({ breadcrumb }: { breadcrumb?: Breadcrumb }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumb?.tree?.map((item) => (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
        {breadcrumb?.currentPage && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumb.currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
