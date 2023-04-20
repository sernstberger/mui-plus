import { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to bnb!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}

export default CustomApp;
