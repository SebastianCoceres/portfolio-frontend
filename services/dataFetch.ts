import {
  Blog,
  BlogDetail,
  Project,
  ProjectDetail,
  ProjectPath,
  Experience,
  ExperienceDetail,
  ExperiencePath,
  About,
  Category,
} from "@/@types/schema";
import { getImageUrl } from "@/hooks/getImageUrl";
import useFormatDate from "@/hooks/useFormatDate";
var qs = require("qs");

//Blog
export async function getBlogPosts(locale = "es"): Promise<Blog[]> {
  let res = await fetch(
    `${process.env.MY_API}/blogs?populate=*${
      locale != "es" ? "&locale=en" : ""
    }`
  );
  let blogs = await res.json();

  return blogs.data.map((post: any): Blog => {
    let dateFormated = useFormatDate(post.attributes.publishedAt, locale);
    let categories = post.attributes.categories?.data.map(
      (category: { id: number; attributes: { name: string; hex: string } }) => {
        return {
          id: category.id,
          name: category.attributes.name,
          color: category.attributes.hex,
        };
      }
    );
    return {
      id: post.id,
      image: getImageUrl(post.attributes.image.data?.attributes.url),
      externalImg: post.attributes.externalImg,
      slug: post.attributes.slug,
      title: post.attributes.title,
      description: post.attributes.description || "",
      date: dateFormated || "",
      categories: categories || "",
      i18n: post.attributes.localizations.data[0]?.id || "",
    };
  });
}

export async function searchBlogPosts(
  q = "",
  locale = "es",
  pag = 1
): Promise<{ blogs: Blog[]; meta: any }> {
  const titleSearch = q.split(" ").map((q) => {
    const searchQuery = {
      title: {
        $contains: q,
      },
    };
    return searchQuery;
  });
  const categoriesSearch = q.split(" ").map((q) => {
    const searchQuery = {
      categories: {
        name: {
          $contains: q,
        },
      },
    };
    return searchQuery;
  });

  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            $and: titleSearch,
          },
          {
            $and: categoriesSearch,
          },
        ],
      },
      pagination: {
        page: pag,
        pageSize: 8,
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  let res = await fetch(`${process.env.MY_API}/blogs?populate=*&${query}`);
  let blogs = await res.json();

  return {
    meta: blogs.meta,
    blogs: blogs.data.map((post: any): Blog => {
      let dateFormated = useFormatDate(post.attributes.publishedAt, locale);
      let categories = post.attributes.categories?.data.map(
        (category: {
          id: number;
          attributes: { name: string; hex: string };
        }) => {
          return {
            id: category.id,
            name: category.attributes.name,
            color: category.attributes.hex,
          };
        }
      );
      return {
        id: post.id,
        image: getImageUrl(post.attributes.image?.data?.attributes.url),
        externalImg: post.attributes.externalImg,
        slug: post.attributes.slug,
        title: post.attributes.title,
        description: post.attributes.description || "",
        date: dateFormated || "",
        categories: categories || "",
        i18n: post.attributes.localizations?.data[0]?.id || "",
      };
    }),
  };
}

export async function getBlogDetail(
  slug: string,
  locale: string
): Promise<BlogDetail> {
  let res = await fetch(
    `${process.env.MY_API}/blogs?populate=*${
      locale != "es" ? "&locale=en" : ""
    }&filters[slug][$eq]=${slug}`
  );
  let post = await res.json();
  let dateFormated = useFormatDate(post.data[0].attributes.publishedAt, locale);
  let categories = post.data[0].attributes.categories?.data.map(
    (category: { id: number; attributes: { name: string; hex: string } }) => {
      return {
        id: category.id,
        name: category.attributes.name,
        color: category.attributes.hex,
      };
    }
  );
  return {
    id: post.data[0].id,
    image: getImageUrl(post.data[0].attributes.image.data?.attributes.url),
    externalImg: post.data[0].attributes.externalImg,
    slug: post.data[0].attributes.slug,
    title: post.data[0].attributes.title,
    description: post.data[0].attributes.description,
    date: dateFormated || "",
    categories: categories || "",
    content: post.data[0].attributes.content,
    i18n: post.data[0].attributes.localizations.data[0]?.id || "",
  };
}

//Projects
export async function getProjects(locale = "es"): Promise<Project[]> {
  let res = await fetch(
    `${process.env.MY_API}/proyects?populate=*${
      locale != "es" ? "&locale=en" : ""
    }`
  );
  let projects = await res.json();

  return projects.data.map((proyect: any): Project => {
    let categories = proyect.attributes.categories?.data.map(
      (category: { id: number; attributes: { name: string; hex: string } }) => {
        return {
          id: category.id,
          name: category.attributes.name,
          color: category.attributes.hex,
        };
      }
    );
    return {
      id: proyect.id,
      image: getImageUrl(proyect.attributes.image.data?.attributes.url),
      slug: proyect.attributes.slug,
      title: proyect.attributes.title,
      url: proyect.attributes.url || "",
      description: proyect.attributes.description,
      experience: proyect.attributes.experience.data?.attributes.title || "",
      categories: categories || "",
      i18n: proyect.attributes.localizations.data[0]?.id || "",
    };
  });
}

export async function getProjectsPaths(locale = "es"): Promise<ProjectPath[]> {
  let res = await fetch(
    `${process.env.MY_API}/proyects?populate=*${
      locale != "es" ? "&locale=en" : ""
    }`
  );
  let projects = await res.json();
  return projects.data.map((proyect: any): ProjectPath => {
    return {
      id: proyect.id,
      slug: proyect.attributes.slug,
      i18n: proyect.attributes.localizations.data[0]?.id,
      i18nSlug: proyect.attributes.localizations.data[0]?.attributes.slug,
      locale: locale,
    };
  });
}

export async function getProjectsDetail(
  slug: string,
  locale: string
): Promise<ProjectDetail> {
  let res = await fetch(
    `${process.env.MY_API}/proyects?populate=*${
      locale != "es" ? "&locale=en" : ""
    }&filters[slug][$eq]=${slug}`
  );

  let proyect = await res.json();
  let categories = proyect.data[0].attributes.categories?.data.map(
    (category: { id: number; attributes: { name: string; hex: string } }) => {
      return {
        id: category.id,
        name: category.attributes.name,
        color: category.attributes.hex,
      };
    }
  );

  return {
    id: proyect.data[0].id,
    image: getImageUrl(proyect.data[0].attributes.image.data?.attributes.url),
    imageDetail: getImageUrl(
      proyect.data[0].attributes.imagedetail.data?.attributes.url
    ),
    slug: proyect.data[0].attributes.slug,
    title: proyect.data[0].attributes.title || "",
    url: proyect.data[0].attributes.url || "",
    description: proyect.data[0].attributes.description || "",
    experience: proyect.data[0].attributes.experiences?.data || "",
    categories: categories || "",
    content: proyect.data[0].attributes.content || "",
  };
}

//Experience
export async function getExperience(locale = "es"): Promise<Experience[]> {
  let res = await fetch(
    `${process.env.MY_API}/experiences?populate=*&filters[show][$ne]=false${
      locale != "es" ? "&locale=en" : ""
    }`
  );
  let experience = await res.json();
  return experience.data.map((exp: any): Experience => {
    let startDate = exp.attributes.start && new Date(exp.attributes.start);
    let endDate = exp.attributes.end && new Date(exp.attributes.end);
    return {
      id: exp.id,
      image: getImageUrl(exp.attributes.image.data?.attributes.url),
      slug: exp.attributes.slug,
      title: exp.attributes.title,
      start:
        (exp.attributes.start &&
          startDate.toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
          })) ||
        "",
      end:
        (exp.attributes.end &&
          endDate.toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
          })) ||
        "",
      description: exp.attributes.description,
      projects: exp.attributes.projects?.data || "",
      i18n: exp.attributes.localizations.data[0]?.id,
    };
  });
}

export async function getExperiencePaths(
  locale = "es"
): Promise<ExperiencePath[]> {
  let res = await fetch(
    `${process.env.MY_API}/experiences?populate=*${
      locale != "es" ? "&locale=en" : ""
    }`
  );
  let experiences = await res.json();
  return experiences.data.map((experience: any): ExperiencePath => {
    return {
      id: experience.id,
      slug: experience.attributes.slug,
      i18n: experience.attributes.localizations.data[0]?.id,
      i18nSlug: experience.attributes.localizations.data[0]?.attributes.slug,
      locale: locale,
    };
  });
}

export async function getExperienceDetail(
  slug: string,
  locale: string
): Promise<ExperienceDetail> {
  let res = await fetch(
    `${process.env.MY_API}/experiences?populate=*${
      locale != "es" ? "&locale=en" : ""
    }&filters[slug][$eq]=${slug}`
  );

  let experience = await res.json();
  let projects = await Promise.all(
    experience.data[0].attributes.proyects?.data.map(async (project: any) => {
      return await getProjectsDetail(project.attributes.slug, locale);
    })
  );

  return {
    id: experience.data[0].id,
    image: getImageUrl(
      experience.data[0].attributes.image.data?.attributes.url
    ),
    slug: experience.data[0].attributes.slug,
    title: experience.data[0].attributes.title || "",
    description: experience.data[0].attributes.description || "",
    projects: projects || "",
  };
}

//About
export async function getAbout(): Promise<About> {
  let res = await fetch(`${process.env.MY_API}/about?populate=*`);
  let about = await res.json();

  return {
    esContent: about.data.attributes.content,
    enContent: about.data.attributes.localizations.data[0]?.attributes.content,
    image: about.data.attributes.photo.data.attributes.url,
  };
}

export async function getCategories(): Promise<Category> {
  let res = await fetch(`${process.env.MY_API}/categories?populate=*`);
  let categories = await res.json();
  return categories.data.map((category: any): Category => {
    const projects = category.attributes.proyects?.data.filter(
      (el: any) => el.attributes.locale == "es"
    ).length;
    const blogs = category.attributes.blogs?.data.filter(
      (el: any) => el.attributes.locale == "es"
    ).length;
    return {
      id: category.id,
      name: category.attributes.name,
      color: category.attributes.hex,
      projects: projects,
      blog: blogs,
    };
  });
}
