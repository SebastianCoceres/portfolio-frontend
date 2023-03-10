import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import images from "@/constants/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { getProjects } from "@/services/dataFetch";
import Title from "@/components/atoms/Title";
import ProjectsCard from "@/components/ProjectsCard";

const Proyectos: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <DefaultErrorPage statusCode={404} />;
  }
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = `${t.projects.menu}. Sebastian Coceres`;
  const description = t.projects.description;
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
          layoutId="projectsImg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-screen fixed left-0 top-0 -z-[1] "
        >
          <Image
            src={images.projects}
            alt=""
            fill
            className="grayscale object-cover opacity-10 pointer-events-none"
          />
        </motion.div>
        <Title align="center">{t.projects.title}</Title>
        <div className="text-white flex flex-wrap mx-auto max-w-6xl">
          {data.map((el: any, i: number) => (
            <ProjectsCard key={el.id} data={el} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Proyectos;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const projects = await getProjects(locale);
    return {
      props: {
        data: projects,
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
