import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

const ArticleItem = ({ article, showFeaturedImages }) => {
  const { featuredImage, title, uri } = article;
  const classes = cn({
    "block h-full text-xl px-8 py-16 border-t-2 border-primary-25 border-dotted hover:border-accent hover:text-accent hover:bg-primary-5 transition group": true,
    "text-center": showFeaturedImages
  });
  return (
    <li>
      <Link href={uri}>
        <a className={classes}>
          {title}
          {showFeaturedImages &&
            (featuredImage && featuredImage.length > 0 ? (
              <figure className="grayscale mix-blend-different dark:invert w-1/2 mt-8 mx-auto">
                <Image
                  alt={title}
                  height={featuredImage[0].height}
                  layout="responsive"
                  src={featuredImage[0].url}
                  width={featuredImage[0].width}
                />
              </figure>
            ) : (
              <div className="text-8xl text-primary-10">?</div>
            ))}
        </a>
      </Link>
    </li>
  );
};

export default ArticleItem;
