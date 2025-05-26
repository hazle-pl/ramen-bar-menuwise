import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <meta name="author" content="Hazle"/>
          <meta name="title" content="Hazle - Profesjonalne Strony Internetowe, Aplikacje i Marketing Online"/>
          <meta name="description" content="Hazle – Tworzymy nowoczesne strony internetowe, aplikacje webowe i mobilne, oferujemy usługi marketingu online, SEO oraz grafikę komputerową. Sprawdź naszą ofertę!"/>
          <meta name="keywords" content="tworzenie stron internetowych, aplikacje webowe, marketing online, SEO, grafika komputerowa, projektowanie logo, e-commerce, strony responsywne, kampanie reklamowe, social media, branding, Hazle"/>
          <meta name="robots" content="index, follow"/>
          <meta name="language" content="pl"/>
          <meta name="theme-color" content="#111204"/>

          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://www.hazle.pl/"/>
          <meta property="og:title" content="Hazle - Profesjonalne Strony Internetowe, Aplikacje i Marketing Online"/>
          <meta property="og:description" content="Hazle – Nowoczesne strony internetowe, aplikacje i marketing online. Sprawdź nasze usługi w zakresie grafiki komputerowej, SEO i e-commerce."/>

          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:url" content="https://www.hazle.pl/"/>
          <meta property="twitter:title" content="Hazle - Profesjonalne Strony Internetowe, Aplikacje i Marketing Online"/>
          <meta property="twitter:description" content="Hazle – Tworzymy strony, aplikacje i prowadzimy skuteczne kampanie marketingowe. Zapewniamy kompleksowe rozwiązania dla Twojej firmy!"/>

          <link rel="canonical" href="https://hazle-pl.vercel.app/"/>

          {/* <meta name="google-site-verification" content="WSTAW_TUTAJ_KOD_GOOGLE_VERIFICATION"/>
          <meta name="bing-site-verification" content="WSTAW_TUTAJ_KOD_BING_VERIFICATION"/> */}

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
