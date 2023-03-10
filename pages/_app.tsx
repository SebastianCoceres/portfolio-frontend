import type { AppProps } from "next/app";
import "../styles/index.scss";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
