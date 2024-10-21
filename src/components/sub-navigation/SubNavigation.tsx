import Link from "next/link";

interface Nav {
  base: string;
  item: {
    href: string;
    title: string;
  }[];
}

const SubNavigation = ({ nav }: { nav: Nav }) => {
  return (
    <div className="bg-stone-100 py-3 font-dmSans flex justify-center gap-x-10">
      {nav.item.map((n) => (
        <Link
          key={n.href}
          href={nav.base + n.href}
          className="hover:text-stone-500 hover:underline"
        >
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default SubNavigation;
