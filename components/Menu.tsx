import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import es from "@/locales/es";
import en from "@/locales/en";
import useScrollPosition from "../hooks/useScrollPosition";

export default function DropdownMenu() {
  const router = useRouter();
  const { locale, asPath } = router;
  const t = locale === "es" ? es : en;
  const links = [
    { href: "/", label: t.home.menu },
    { href: "/about", label: t.about.menu },
    { href: "/experience", label: t.experience.menu },
    { href: "/projects", label: t.projects.menu },
    { href: "/blog", label: t.blog.menu },
  ];

  const scrollY = useScrollPosition();

  return (
    <div className="fixed top-8 right-8 w-56 text-right z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`inline-flex w-full justify-center rounded-md hover:bg-indigo-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
              scrollY > 50 && "bg-indigo-600"
            }`}
          >
            <span className="sr-only">Menu</span>
            <FaBars />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="px-1 py-1 ">
              {links.map((link, i) => (
                <Menu.Item key={`menu-item-${i}`}>
                  <Link
                    href={link.href}
                    className={`${
                      asPath == link.href
                        ? `bg-indigo-600 text-white`
                        : "text-gray-600"
                    } hover:bg-indigo-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`}
                  >
                    {link.label}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
