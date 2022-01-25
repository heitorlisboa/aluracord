import "../styles/reset.css";
import "../styles/global.css"
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aluracord</title>
        <meta
          name="description"
          content="Aluracord - Um clone do discord feito durante a Imersão React da Alura"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
