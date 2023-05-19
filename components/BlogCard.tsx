import Image from "next/image";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Categories from "./Categories";

function BlogCard({ data, index }: any) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  return (
    <motion.div
      initial={{ transform: "translateY(100%) scale(0)", opacity: 0 }}
      animate={{ transform: "translateY(0%) scale(1)", opacity: 1 }}
      transition={{
        delay: 0 + index / 10,
        duration: 0.8,
        type: "ease",
        opacity: { delay: 0 + index / 10, duration: 0.8 },
      }}
      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4"
    >
      <div className="p-2 border border-neutral-600 rounded-md h-full flex flex-col">
        <figure className="relative aspect-video mb-4">
          <Image
            src={!!data.externalImg ? data.externalImg : data.image}
            alt={""}
            fill
            className="rounded-md"
          ></Image>
          <figcaption className="absolute z-10 bottom-2 right-2 translate-y-[50%] px-4 py-2 bg-indigo-600 rounded-md text-xs">
            {data.date}
          </figcaption>
        </figure>
        <div className="flex-grow mb-4">
          <h2 className="text-xl font-bold mb-2 text-indigo-400">
            {data.title}
          </h2>
          <p className="mb-4 break-words">{`${data.description.slice(0, 100)}${
            data.description.length > 100 ? "..." : ""
          }`}</p>
          {data.categories && <Categories list={data.categories} />}
        </div>
        <hr className="w-full border-b border-neutral-700" />
        <div className="flex justify-end py-2">
          <Link
            href={`/blog/${data.slug}`}
            className="flex items-center hover:text-indigo-300 hover:scale-110 transition-transform"
          >
            {t.seeMore} <FaLongArrowAltRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default BlogCard;
