import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import images from "@/constants/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { searchBlogPosts } from "@/services/dataFetch";
import Title from "@/components/atoms/Title";
import BlogCard from "@/components/BlogCard";
import NoDataMsg from "@/components/NoDataMsg";
import SearchForm from "@/components/SearchForm";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import BlogCardLoading from "@/components/BlogCardLoading";

const Blogs: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const title = `${t.blog.menu}. Sebastian Coceres`;
  const description = t.blog.description;

  const [blogsList, setBlogsList] = useState(data);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [pag, setPag] = useState(data?.meta.pagination.page);
  const debouncedQuery = useDebounce<string>(q, 500);
  const debouncedLoading = useDebounce<boolean>(loading, 1000);

  async function getFilteredData() {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, locale, pag }),
    };
    const res = await fetch("/api/searchBlog", requestOptions);
    const data = await res.json();
    if (!!data) {
      setLoading(false);
      setBlogsList(data);
    }
  }

  const handlePageChange = (page: any) => {
    setPag(page);
  };

  useEffect(() => {
    getFilteredData();
  }, [debouncedQuery, pag]);

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
      <section className="container mx-auto py-24 px-4 text-white">
        <motion.div
          layoutId="blogImg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-screen fixed left-0 top-0 -z-[1] "
        >
          <Image
            src={images.ideas}
            alt=""
            fill
            className="grayscale object-cover opacity-10"
          />
        </motion.div>
        <Title align="center">{t.blog.title}</Title>
        <SearchForm
          setQuery={setQ}
          setPag={setPag}
          disabled={data.blogs.length == 0}
        />
        {!!debouncedLoading ? (
          <BlogCardLoading count={8} />
        ) : (
          !!blogsList && (
            <>
              <div className="text-white flex flex-wrap -mx-4">
                {blogsList.blogs.length == 0 ? (
                  <NoDataMsg />
                ) : (
                  blogsList.blogs.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((blog: any, i: number) => {
                    return <BlogCard key={blog.id} data={blog} index={i} />;
                  })
                )}
              </div>
              {blogsList.meta.pagination.total >
                blogsList.meta.pagination.pageSize && (
                  <div className="pagination text-white flex justify-center mt-8">
                    {[...Array(blogsList.meta.pagination.pageCount)].map(
                      (el, i) => {
                        return (
                          <span
                            className={`py-2 px-4 cursor-pointer hover:bg-indigo-600 rounded-md ${pag == i + 1 ? "bg-indigo-500" : ""
                              }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </span>
                        );
                      }
                    )}
                  </div>
                )}
            </>
          )
        )}
      </section>
    </>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    let { locale } = context;
    const data = await searchBlogPosts("", locale);
    return {
      props: {
        data: data,
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
