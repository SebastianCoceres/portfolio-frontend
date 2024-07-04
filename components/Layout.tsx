import BreadCrums from "./BreadCrums";
import DropdownMenu from "./Menu";
import { useRouter } from "next/router";

function Layout({ children }: any) {
  const router = useRouter();
  const { asPath, locale } = router;
  const onChangeLanguage = (lang: string) => (e: any) => {
    e.preventDefault();
    router.push(router.asPath, undefined, { locale: lang });
  };
  return (
    <main className="min-h-screen min-w-screen relative">
      <BreadCrums />
      {asPath != "/" && <DropdownMenu />}
      {/* {asPath == "/" && (
        <button className="text-white absolute top-6 right-6 z-10 border border-neutral-100/50 md:bg-indigo-600 xl:bg-transparent hover:bg-indigo-800 rounded-md cursor-pointer">
          {locale == "es" ? (
            <span className="block px-4 py-2" onClick={onChangeLanguage("en")}>
              En
            </span>
          ) : (
            <span className="block px-4 py-2" onClick={onChangeLanguage("es")}>
              Es
            </span>
          )}
        </button>
      )} */}

      {children}
    </main>
  );
}

export default Layout;
