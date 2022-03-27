import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="h-full">
        <Head>
          <link rel="preload" href="/fonts/apercu-subset.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/apercu-medium-subset.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/apercu-bold-subset.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/apercu-mono-subset.woff2" as="font" crossOrigin="" />
        </Head>
        <body className="h-full overflow-hidden font-sans antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
