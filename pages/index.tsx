import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import images from "../constants/images";
import Link from "next/link";
import { useRouter } from "next/router";
import es from "../public/locales/es";
import en from "../public/locales/en";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaMobile } from "react-icons/fa";

const Home: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = "Sebastian Coceres";
  const description = t.home.description;

  const commonClasses =
    "relative border border-neutral-600 overflow-hidden rounded-xl";

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <section className="min-h-screen flex flex-col p-4 lg:px-8 lg:py-16 xl:p-24 ">
        <div className="flex-grow grid grid-cols-2 grid-rows-4 md:grid-cols-5 md:grid-rows-3 gap-2 h-[1px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`col-span-2 row-span-2 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 lg:col-end-5 p-8 bg-neutral-900 place-content-center ${commonClasses} `}
          >
            <div className="h-full grid place-content-center">
              <div className="animation_container">
                <div className="box">
                  <div className="title">
                    <span className="block"></span>
                    <h1>
                      Sebastián Cóceres<span></span>
                    </h1>
                  </div>

                  <div className="role">
                    <div className="block"></div>
                    <p>{t.home.title}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-white mt-8 text-3xl">
                <a
                  href="https://www.linkedin.com/in/sebastian-coceres/"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="px-4 hover:scale-110 hover:text-indigo-400 transition-transform duration-500"
                  title="linkedin.com/sebastian-coceres"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/SebastianCoceres"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="px-4 hover:scale-110 hover:text-indigo-400 transition-transform duration-500"
                  title="github.com/SebastianCoceres"
                >
                  <span className="sr-only">Github</span>
                  <FaGithub />
                </a>
                <a
                  href="mailto:sebastian.coceres11@gmail.com"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="px-4 hover:scale-110 hover:text-indigo-400 transition-transform duration-500"
                  title="sebastian.coceres11@gmail.com"
                >
                  <span className="sr-only">sebastian.coceres11@gmail.com</span>
                  <FaEnvelope />
                </a>
                <a
                  href="tel:+34629915707"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="px-4 hover:scale-110 hover:text-indigo-400 transition-transform duration-500"
                  title="+34 629 91 57 07"
                >
                  <span className="sr-only">+34629915707</span>
                  <FaMobile />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translate(50%,50%)" }}
            animate={{ opacity: 1, transform: "translate(0%,0%)" }}
            transition={{
              delay: 0,
              duration: 1,
              type: "ease",
              opacity: { duration: 1 },
            }}
            className={`md:col-start-4 md:col-end-6 md:row-start-1 md:row-end-2 lg:col-start-5 ${commonClasses}`}
          >
            <Link href="/projects">
              <motion.div
                layoutId="projectsImg"
                className="w-full h-full relative"
              >
                <Image
                  fill
                  priority={true}
                  src={images.projects}
                  alt=""
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-110"
                />
              </motion.div>
              <h2 className="text-lg md:text-4xl text-white text-right absolute bottom-4 right-4">
                {t.projects.menu}
              </h2>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translate(-50%,50%)" }}
            animate={{ opacity: 1, transform: "translate(0%,0%)" }}
            transition={{
              delay: 0,
              duration: 1,
              type: "ease",
              opacity: { duration: 1 },
            }}
            className={`md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4 lg:col-start-1 lg:col-end-2 ${commonClasses}`}
          >
            <Link href="/about">
              <motion.div
                layoutId="aboutImg"
                className="w-full h-full relative"
              >
                <Image
                  src={images.study}
                  alt=""
                  fill
                  priority={true}
                  className="grayscale hover:grayscale-0 transition-all duration-1000 object-cover hover:scale-110"
                />
              </motion.div>

              <h2 className="text-lg md:text-4xl text-white text-right absolute bottom-4 right-4">
                {t.about.menu}
              </h2>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translate(0,50%)" }}
            animate={{ opacity: 1, transform: "translate(0%,0%)" }}
            transition={{
              delay: 0,
              duration: 1,
              type: "ease",
              opacity: { duration: 1 },
            }}
            className={`md:col-start-3 md:col-end-6 md:row-start-3 md:row-end-4 lg:col-start-2 lg:col-end-5 ${commonClasses}`}
          >
            <Link href="/experience">
              <motion.div
                layoutId="experienceImg"
                className="w-full h-full relative"
              >
                <Image
                  src={images.work}
                  alt=""
                  fill
                  priority={true}
                  className="grayscale hover:grayscale-0 transition-all duration-1000 object-cover hover:scale-110"
                />
              </motion.div>
              <h2 className="text-lg md:text-4xl text-white text-right absolute bottom-4 right-4">
                {t.experience.menu}
              </h2>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translate(50%,50%)" }}
            animate={{ opacity: 1, transform: "translate(0%,0%)" }}
            transition={{
              delay: 0,
              duration: 1,
              type: "ease",
              opacity: { duration: 1 },
            }}
            className={`md:col-start-4 md:col-end-6 md:row-start-2 md:row-end-3 lg:row-start-2 lg:row-end-4 lg:col-start-5 lg:col-end-6 ${commonClasses}`}
          >
            <Link href="/blog">
              <motion.div layoutId="blogImg" className="w-full h-full relative">
                <Image
                  src={images.ideas}
                  alt=""
                  fill
                  priority={true}
                  className="grayscale hover:grayscale-0 transition-all duration-1000 object-cover hover:scale-110"
                />
              </motion.div>
              <h2 className="text-lg md:text-4xl text-white text-right absolute bottom-4 right-4">
                {t.blog.menu}
              </h2>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
