import { useRouter } from "next/router";
import { useRef, Dispatch, SetStateAction } from "react";
import en from "@/locales/en";
import es from "@/locales/es";

function SearchForm({
  setQuery,
  setPag,
  disabled = false,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  setPag: Dispatch<SetStateAction<number>>;
  disabled: boolean;
}) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const q = useRef<HTMLInputElement>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (q.current !== null) {
      setPag(1);
      setQuery(q.current.value);
    }
  }

  return (
    <>
      <div
        className={`max-w-md mx-auto my-8 ${
          disabled ? "opacity-30 cursor-none pointer-events-none" : ""
        }`}
      >
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className={`block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 `}
              placeholder="Search"
              ref={q}
              onChange={(e) => {
                setPag(1);
                setQuery(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              {t.search}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchForm;
