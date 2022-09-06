// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

// https://nextjs.org/docs/messages/no-stylesheets-in-head-component

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap" rel="stylesheet" />



      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
