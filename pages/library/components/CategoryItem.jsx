import Link from "next/link";

const CategoryItem = ({ children, slug }) => {
  return (
    <li>
      <Link href={`/library/category/${encodeURIComponent(slug)}`}>
        <a className="text-xl md:text-2xl text-secondary block p-12 md:p-20 h-full border border-secondary-10 hover:border-accent hover:text-accent">
          {children}
        </a>
      </Link>
    </li>
  );
};

export default CategoryItem;
