import { type } from "os";

type aligns = {
  start: string;
  center: string;
  end: string;
};

function Title({
  children,
  align = "start",
}: {
  children: any;
  align?: string;
}) {
  const alignments: aligns = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };
  return (
    <header
      className={`flex ${alignments[align as keyof typeof alignments]} mb-8`}
    >
      <div className="animation_container h-full">
        <div className="box">
          <div className="title">
            <span className="block"></span>
            <h1 className="font-bold">
              {children}
              <span></span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Title;
