import '../styles/destyle.css'
import '../styles/base.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
    </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
