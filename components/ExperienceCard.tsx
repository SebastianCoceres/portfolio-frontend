import Image from "next/image";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";

function ExperienceCard({ data, index }: any) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  return (
    <motion.article
      initial={{ transform: "translateY(100%) scale(0)", opacity: 0 }}
      animate={{ transform: "translateY(0%) scale(1)", opacity: 1 }}
      transition={{
        delay: 0 + index / 10,
        duration: 0.8,
        type: "ease",
        opacity: { delay: 0 + index / 10, duration: 0.8 },
      }}
      className="w-full px-4 mb-4"
    >
      <div className="flex p-4 bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border-l border-b border-neutral-700 overflow-hidden rounded-md">
        <div className="w-1/6">
          <figure className="relative  aspect-square">
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded-full"
            ></Image>
          </figure>
        </div>
        <div className="w-5/6 pl-4 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-md md:text-xl font-bold">{data.title}</h2>
            <p className="text-xs md:text-sm text-neutral-400">
              <span className="capitalize">{data.start}</span>
              {data.start && " - "}
              <span className="capitalize">
                {data.end ? data.end : t.dateNoEnd}
              </span>
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href={`/experience/${data.slug}`}
              className="flex items-center hover:text-indigo-300 hover:scale-110 transition-transform"
            >
              {t.experience.projects} <FaLongArrowAltRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ExperienceCard;
