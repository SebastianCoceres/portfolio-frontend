import { getProjectsDetail, getProjectsPaths } from "@/services/dataFetch";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import CodeBlock from "@/components/CodeBlock";
import ButtonLink from "@/components/atoms/ButtonLink";
import { HiExternalLink } from "react-icons/hi";
import Title from "@/components/atoms/Title";

const Proyect = ({
  proyect,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!proyect) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{proyect.title}</title>
        <meta name="description" content={proyect.description} key="desc" />
        <meta name="og:title" content={proyect.title} />
        <meta name="og:description" content={proyect.description} />
        <meta name={"og:image"} title={"og:title"} content={proyect.image} />
      </Head>
      <section className="container mx-auto py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="container m-auto flex flex-wrap"
        >
          <div className="w-full md:w-1/3 px-4 relative md:order-1">
            <div className="md:sticky md:top-8">
              <figure className="relative  mb-8 aspect-[2/1] grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-700 hover:cursor-pointer hover:border hover:border-neutral-400/80">
                <Image
                  fill
                  src={proyect.imageDetail}
                  alt=""
                  className="object-cover"
                ></Image>
              </figure>
              {proyect.url && (
                <ButtonLink href={proyect.url} iconTag={<HiExternalLink />}>
                  Ir al proyecto
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="w-full md:w-2/3 px-4">
            <Title>{proyect.title}</Title>
            <div className="Markdown__Handler">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={CodeBlock}>
                {proyect.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const proyect = await getProjectsDetail(context.params?.slug, locale);
    return {
      props: {
        proyect: proyect,
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
export async function getStaticPaths({ locales }: any) {
  let projects = [];
  projects = await Promise.all(
    locales.map(async (lang: any) => {
      if (lang !== "es") {
        return await getProjectsPaths(lang);
      } else {
        return await getProjectsPaths();
      }
    })
  );

  const paths = projects
    .flat()
    .map((project) => {
      return {
        params: { slug: project.slug },
        locale: project.locale,
      };
    })
    .flat();

  return {
    paths,
    fallback: "blocking",
  };
}

export default Proyect;
