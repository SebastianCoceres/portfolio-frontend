import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import { getCategories } from "@/services/dataFetch";
import Title from "@/components/atoms/Title";
import CategoriesChart from "@/components/CategoriesChart";

const Proyectos: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = `${t.projects.menu}. Sebastian Coceres`;
  const description = t.categories.description;
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
      <section className="text-white container mx-auto py-24">
        <Title align="center">{t.categories.title}</Title>
        <CategoriesChart data={data} />
      </section>
    </>
  );
};

export default Proyectos;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    const categories = await getCategories();
    return {
      props: {
        data: categories,
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
