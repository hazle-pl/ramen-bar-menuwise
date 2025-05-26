import Container from '@/components/Container';
import Layout from '@/components/Layout';
import React from 'react';
import RichText from '@/components/RichText';
import Link from 'next/link';
import useTranslation from '@/lib/useTranslations';
import Head from 'next/head';

const Documents: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
    <Head>
      <meta name="title" content="Hazle - Dokumenty"/>
      <meta name="description" content="Hazle – Tworzymy nowoczesne strony internetowe, aplikacje webowe i mobilne, oferujemy usługi marketingu online, SEO oraz grafikę komputerową. Sprawdź naszą ofertę!"/>
    </Head>
    <Layout>
      <Container paddingBottom="5" paddingTop='5' background="neutral-900">
        <RichText justify='center'>
            <h1>{translate('404', '404-error')}</h1>
            <p className="pb-3">{translate('404', 'oops')}</p>
            <Link className="button primary" href="/">{translate('404', 'home')}</Link>
        </RichText>
      </Container>
    </Layout>
    </>
  );
};

export default Documents;