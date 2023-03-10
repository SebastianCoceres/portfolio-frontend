import { type } from "os";

export type Blog = {
  id: number;
  image: string;
  externalImg: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: CategoryTag[];
  i18n: number;
};

export type BlogDetail = {
  id: number;
  image: string;
  externalImg: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: CategoryTag[];
  content: string;
  i18n: number;
};

export type Project = {
  id: number;
  image: string;
  slug: string;
  title: string;
  url: string;
  description: string;
  categories: CategoryTag[];
  experience: Experience[];
  i18n: number;
};

export type ProjectDetail = {
  id: number;
  image: string;
  imageDetail: string;
  slug: string;
  title: string;
  url: string;
  description: string;
  categories: CategoryTag[];
  experience: Experience[];
  content: string;
};

export type ProjectPath = {
  id: string;
  i18n: number;
  slug: string;
  i18nSlug: string;
  locale: string;
};

export type Experience = {
  id: number;
  image: string;
  slug: string;
  title: string;
  description: string;
  start: string;
  end: string;
  projects: Proyect[];
  i18n: number;
};

export type ExperienceDetail = {
  id: number;
  image: string;
  slug: string;
  title: string;
  description: string;
  projects: Proyect[];
};

export type ExperiencePath = {
  id: string;
  i18n: number;
  slug: string;
  i18nSlug: string;
  locale: string;
};

export type Category = {
  id: number;
  name: string;
  color: string;
  projects: Proyect[];
  blog: Blog[];
};

export type CategoryTag = {
  id: number;
  name: string;
  color: string;
};

export type About = {
  esContent: string;
  enContent: string;
  image: string;
};
