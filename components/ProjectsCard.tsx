import Link from "next/link";
import Categories from "@/components/Categories";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import { motion } from "framer-motion";

function ProjectsCard({ data, index }: any) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  return (
    <motion.article
      initial={{ transform: "translateY(100%) scale(0)", opacity: 0 }}
      animate={{ transform: "translateY(0%) scale(1)", opacity: 1 }}
      transition={{
        delay: 0+(index/10),
        duration: .8,
        type: "ease",
        opacity: { delay: 0+(index/10), duration: .8 },
      }}
      className="w-full lg:w-1/2 px-4 mb-4"
    >
      <div className="card h-full w-full p-2 text-white bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border-l border-b border-neutral-700 overflow-hidden rounded-md flex flex-col md:flex-row">
        <div className="w-full lg:w-5/12 card__image relative aspect-[2/1]">
          <Image
            fill
            src={data.image}
            alt={""}
            className="object-cover rounded-md"
          />
        </div>
        <div className="w-full lg:w-7/12 card__body p-4 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-2 text-indigo-300">
              {data.title}
            </h2>
            <p>{data.description.length > 100 ? `${data.description.slice(0,100)}...`: data.description}</p>
            <div className="mt-2">
              <Categories list={data.categories} />
            </div>
          </div>
          <div>
            <hr className="w-full border border-neutral-700 mt-4 mb-2" />
            <div className="flex justify-between">
              <span className="text-neutral-400">{data.experience}</span>
              <Link
                href={`/projects/${data.slug}`}
                className="flex items-center hover:text-indigo-300 hover:scale-110 transition-transform"
              >
                {t.seeMore} <FaLongArrowAltRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectsCard;
