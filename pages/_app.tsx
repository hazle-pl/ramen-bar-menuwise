import { AppProps } from 'next/app';
import '@/styles/main.scss';

const ProjectTemplate = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default ProjectTemplate;
