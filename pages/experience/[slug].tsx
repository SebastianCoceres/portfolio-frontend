import { getExperienceDetail, getExperiencePaths } from "@/services/dataFetch";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Title from "@/components/atoms/Title";
import ProjectsCard from "@/components/ProjectsCard";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";

const Experience: NextPage = ({
  experience,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{experience.title}</title>
        <meta name="description" content={experience.description} key="desc" />
        <meta name="og:title" content={experience.title} />
        <meta name="og:description" content={experience.description} />
        <meta name={"og:image"} title={"og:title"} content={experience.image} />
      </Head>
      <section className="container mx-auto py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="px-4"
        >
          <Title>{`${t.experience.fulfilledProjects}: ${experience.title}`}</Title>
          <div className="-mx-4 flex flex-wrap max-w-6xl">
            {experience.projects.map((proyect: any, i: number) => {
              return <ProjectsCard key={proyect.id} data={proyect} index={i} />;
            })}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const experience = await getExperienceDetail(context.params?.slug, locale);
    return {
      props: {
        experience: experience,
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
export async function getStaticPaths({ locales }: any) {
  let experience = [];
  experience = await Promise.all(
    locales.map(async (lang: any) => {
      if (lang !== "es") {
        return await getExperiencePaths(lang);
      } else {
        return await getExperiencePaths();
      }
    })
  );

  const paths = experience
    .flat()
    .map((exp) => {
      return {
        params: { slug: exp.slug },
        locale: exp.locale,
      };
    })
    .flat();

  return {
    paths,
    fallback: "blocking",
  };
}

export default Experience;
