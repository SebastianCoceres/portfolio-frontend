import type { NextApiRequest, NextApiResponse } from "next";
import en from "../../public/locales/en";
import es from "../../public/locales/es";
import { Blog } from "@/@types/schema";
import { searchBlogPosts } from "@/services/dataFetch";

export default async function searchBlog(
  req: NextApiRequest,
  res: NextApiResponse<{ blogs: Blog[]; meta: any }>
) {
  const { locale } = req.body;
  const t = locale === "es" ? es : en;

  if (req.method === "POST") {
    let {
      q,
      locale,
      pag,
    }: { q: string; locale: string; pag: number } = req.body;
    let data = await searchBlogPosts(q, locale, pag);
    try {
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
}
