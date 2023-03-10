import Link from "next/link";

export default function FourOhFour() {
  return (
    <section className="text-white h-screen w-screen grid place-content-center">
      <h1 className="text-2xl">404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </section>
  );
}
