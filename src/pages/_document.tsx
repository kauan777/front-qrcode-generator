import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/miniature.png" />
        <meta
          name="description"
          content="Create your page with your social networks and even have a qr code to share with your friends"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="QRCode Generator" key="ogtitle" />
        <meta
          property="og:description"
          content="Create your page with your social networks and even have a qr code to share with your friends"
          key="ogdesc"
        />
        <meta
          property="og:site_name"
          content="QrCode Generator"
          key="ogsitename"
        />
        <meta name="googlebot" content="noindex" />
        <meta name="googlebot-news" content="nosnippet"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:image" itemProp="image" content="/background.png" />
        <meta
          property="og:url"
          content="https://qrcodegenerator-azure.vercel.app/"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
