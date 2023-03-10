import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-zinc-900">
          <Main />
          <NextScript />
          <noscript>
            <style
              dangerouslySetInnerHTML={{
                __html: `* { 
                      opacity: 1 !important; 
                      transform: unset !important; 
                      pointer-events: auto !important; 
                    }`,
              }}
            ></style>
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
