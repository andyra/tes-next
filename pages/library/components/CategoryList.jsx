import Link from "next/link";
import cn from "classnames";
import { categoryHref } from "helpers";

const CategoryList = ({ categories, className }) => {
  return (
    <section className={cn("flex", className)}>
      <ul className="flex-1 flex justify-center flex-wrap">
        {!!categories &&
          categories.map(category => (
            <li key={category.slug}>
              <Link href={categoryHref(category.slug)}>
                <a className="block px-12 py-8 rounded-t-lg h-full border-x border-t border-secondary -ml-1 -mt-1 font-serif">
                  {category.title}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CategoryList;
