import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { motion } from "framer-motion";
import es from "@/locales/es";
import en from "@/locales/en";
import images from "@/constants/images";

import { getAbout } from "@/services/dataFetch";
import Title from "@/components/atoms/Title";

const About: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = `${t.about.menu}. Sebastian Coceres`;
  const description = t.about.description;
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
      <section className="container mx-auto py-24 px-4">
        <motion.div
          layoutId="aboutImg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-screen fixed left-0 top-0 z-0 pointer-events-none"
        >
          <Image
            src={images.study}
            alt=""
            fill
            className="grayscale object-cover opacity-10"
          />
        </motion.div>
        <Title align="center">{t.about.title}</Title>
        <motion.div
          initial={{ transform: "translateY(100%)", opacity: 0 }}
          animate={{ transform: "translateY(0%)", opacity: 1 }}
          transition={{
            delay: 0,
            duration: 1,
            type: "ease",
            opacity: { duration: 1 },
          }}
          className="text-white container m-auto max-w-4xl Markdown__Handler"
        >
          <ReactMarkdown>{data}</ReactMarkdown>
        </motion.div>
      </section>
    </>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const about = await getAbout();
    return {
      props: {
        data: locale == "es" ? about.esContent : about.enContent,
        image: about.image,
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        notfound: true,
      },
      revalidate: 10,
    };
  }
};
