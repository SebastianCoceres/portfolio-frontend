import Link from "next/link";
import { useRouter } from "next/router";
import en from "../public/locales/en";
import es from "../public/locales/es";
import { IoIosArrowForward } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";

function BreadCrums() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;

  const traduccionesObj = {
    experience: t.experience.menu,
    projects: t.projects.menu,
    blog: t.blog.menu,
    about: t.about.menu,
    contact: t.contact,
    categories: t.categories.menu,
  };
  const regex = new RegExp(Object.keys(traduccionesObj).join("|"), "gi");
  const asPathWithoutQuery = router.asPath.split("?")[0];
  const asPathNestedRoutes = asPathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center p-4 absolute top-4 left-4 z-10">
      <Link
        href="/"
        className="flex items-center text-white hover:text-indigo-400 font-bold"
      >
        {" "}
        <BsHouseFill className="mx-2" />
        {t.home.menu}
      </Link>
      {asPathNestedRoutes.map((el, i) => {
        return i < asPathNestedRoutes.length - 1 ? (
          <Link
            href={`/${asPathNestedRoutes.slice(0, i - 1)}`}
            key={`el-${i}`}
            className="hidden lg:flex items-center text-white hover:text-indigo-400 font-bold"
          >
            <IoIosArrowForward className="mx-2 " />
            <span>
              {el.replace(regex, function (matched) {
                return traduccionesObj[matched as keyof typeof traduccionesObj];
              })}
            </span>
          </Link>
        ) : router.pathname.includes("[slug]") ? (
          <p key={`el-${i}`} className="hidden lg:flex items-center text-white">
            <IoIosArrowForward className="mx-2" />
            <span>{el.substring(0, el.length)}</span>
          </p>
        ) : (
          <p key={`el-${i}`} className="hidden lg:flex items-center text-white">
            <IoIosArrowForward className="mx-2" />
            <span>
              {el.replace(regex, function (matched) {
                return traduccionesObj[matched as keyof typeof traduccionesObj];
              })}
            </span>
          </p>
        );
      })}
    </div>
  );
}

export default BreadCrums;
