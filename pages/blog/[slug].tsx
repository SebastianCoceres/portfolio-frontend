import { getBlogDetail } from "@/services/dataFetch";
import DefaultErrorPage from "next/error";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/atoms/Title";
import { useRouter } from "next/router";
import FourOhFour from "pages/404";
import Categories from "@/components/Categories";

const Post: NextPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <FourOhFour />;
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{post.title}</title>
        <meta name="description" content={post.description} key="desc" />
        <meta name="og:title" content={post.title} />
        <meta name="og:description" content={post.description} />
        <meta name={"og:image"} title={"og:title"} content={post.image} />
      </Head>
      <section className="container mx-auto max-w-4xl py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="flex flex-wrap"
        >
          <div className="w-full px-4 relative md:order-1 text-white">
            <figure className="relative  mb-8 aspect-[2/1] md:aspect-[4/1]  ">
              <Image
                fill
                src={!!post.externalImg ? post.externalImg : post.image}
                alt=""
                className="object-cover rounded-xl grayscale-[0.5] opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-700 hover:cursor-pointer"
              ></Image>
              <figcaption className="absolute z-10 bottom-2 right-2 translate-y-[50%] px-4 py-2 bg-indigo-600 rounded-md text-xs">
                {post.date}
              </figcaption>
            </figure>

            <Title>{post.title}</Title>
            <div>
              <div className="text-neutral-400 mb-4">{post.description}</div>
              <Categories list={post.categories} />
              <hr className="my-4 border-neutral-600" />
            </div>

            <div className="Markdown__Handler">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={CodeBlock} linkTarget="_blank">
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    let { slug } = context.params;
    let { locale } = context;

    const blog = await getBlogDetail(slug, locale);
    return {
      props: {
        post: blog,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        notfound: true,
      },
    };
  }
};

export default Post;
