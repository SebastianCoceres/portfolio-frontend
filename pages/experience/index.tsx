import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import images from "@/constants/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { getExperience } from "@/services/dataFetch";
import Title from "@/components/atoms/Title";
import ExperienceCard from "@/components/ExperienceCard";

const Experience: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = `${t.experience.menu}. Sebastian Coceres`;
  const description = t.experience.description;
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
      <section className="container mx-auto py-24">
        <motion.div
          layoutId="worksImg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-screen fixed left-0 top-0 -z-[1] "
        >
          <Image
            src={images.work}
            alt=""
            fill
            className="grayscale object-cover opacity-10 pointer-events-none"
          />
        </motion.div>
        <Title align="center">{t.experience.title}</Title>
        <div className="text-white flex flex-col container m-auto max-w-xl">
          {data
            .sort(
              (a: any, b: any) =>
                new Date(b.start).valueOf() - new Date(a.start).valueOf()
            )
            .map((exp: any, i: number) => {
              return <ExperienceCard key={exp.id} data={exp} index={i} />;
            })}
        </div>
      </section>
    </>
  );
};

export default Experience;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const experience = await getExperience(locale);
    return {
      props: {
        data: experience,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        notfound: true,
      },
      revalidate: 10,
    };
  }
};
