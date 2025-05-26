import Container from '@/components/Container';
import Grid from '@/components/Grid';
import Box from '@/components/Box';
import Accordion from '@/components/Accordion';
import Layout from '@/components/Layout';
import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import RichText from '@/components/RichText';
import Link from 'next/link';
import InNumbers from '@/components/inNumbers';
import Image from 'next/image';
import Gallery from '@/components/Gallery';
import ContainerNoWrapper from '@/components/ContainerNoWrapper';
import TeaserCard from '@/components/TeaserCard';
import useTranslation from '@/lib/useTranslations';
import ContactForm from '@/components/ContactForm';
import Head from 'next/head';

const Home: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
    <Head>
      <meta name="title" content="Hazle - Profesjonalne Strony Internetowe, Aplikacje i Marketing Online"/>
      <meta name="description" content="Hazle – Tworzymy nowoczesne strony internetowe, aplikacje webowe i mobilne, oferujemy usługi marketingu online, SEO oraz grafikę komputerową. Sprawdź naszą ofertę!"/>
    </Head>
    <Layout>
      RamenBar
    </Layout>
    </>
  );
};

export default Home;
