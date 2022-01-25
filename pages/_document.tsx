import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head>
        <link href="http://fonts.cdnfonts.com/css/google-sans" rel="stylesheet" />
        <link href="http://fonts.cdnfonts.com/css/helvetica-255" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document