import React from "react";

function BlogCardLoading({ count = 1 }) {
  return (
    <div className="flex flex-wrap -mx-4 my-8">
      {[...Array(count)].map(() => {
        return (
          <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="animate-pingCustom animate-pulse p-2 border border-neutral-600 rounded-md h-full flex flex-col">
              <figure className="bg-slate-700 relative aspect-video mb-4"></figure>
              <div className="flex-grow mb-4">
                <h2 className="bg-slate-700 text-xl font-bold mb-2 text-indigo-400"></h2>
                <p className="bg-slate-700"></p>
              </div>
              <hr className="w-full border-b border-slate-700" />
              <div className="bg-slate-700 flex justify-end py-2"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BlogCardLoading;
