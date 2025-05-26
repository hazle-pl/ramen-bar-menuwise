import Container from '@/components/Container';
import Grid from '@/components/Grid';
import Layout from '@/components/Layout';
import React from 'react';
import TeaserCard from '@/components/TeaserCard';
import useTranslation from '@/lib/useTranslations';
import Breadcrumb from '@/components/Breadcrumb';
import Head from 'next/head';

const Blog: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
        <Head>
            <title>Hazle.pl | Blog</title>
        </Head>
        <Layout>
        <Container paddingBottom="5" paddingTop="5" background="neutral-900">
            <Breadcrumb/>
            <Grid xs="1" md="1" xl="2">
                <TeaserCard href="/blog/jak-zbudowac-silna-marke" imagePosition="left" imageSrc='/img/blog/branding.webp' content={`<h3 className="center">${translate('blog-1', 'category')}</h3><h5>${translate('blog-1', 'title')}</h5><p>${translate('blog-1', 'description')}</p>`}/>
                <TeaserCard href="/blog/strategie-seo" imagePosition="left" imageSrc='/img/blog/seo.webp'  content={`<h3 className="center">${translate('blog-2', 'category')}</h3><h5>${translate('blog-2', 'title')}</h5><p>${translate('blog-2', 'description')}</p>`}/>
                <TeaserCard href="/blog/promowanie-w-socialmedia" imagePosition="left" imageSrc='/img/blog/marketing.webp'  content={`<h3 className="center">${translate('blog-3', 'category')}</h3><h5>${translate('blog-3', 'title')}</h5><p>${translate('blog-3', 'description')}</p>`}/>
                <TeaserCard href="/blog/trendy-w-budowaniu-stron-internetowych" imagePosition="left" imageSrc='/img/blog/websites.webp'  content={`<h3 className="center">${translate('blog-4', 'category')}</h3><h5>${translate('blog-4', 'title')}</h5><p>${translate('blog-4', 'description')}</p>`}/>
            </Grid>
        </Container>
        </Layout>
    </>
  );
};

export default Blog;
