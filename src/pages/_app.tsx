import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import '@/styles/reset.css';
import '@/styles/global.scss';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aluracord</title>
        <meta
          name="description"
          content="Aluracord - Um mini-clone do discord feito durante a Imersão React da Alura"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
