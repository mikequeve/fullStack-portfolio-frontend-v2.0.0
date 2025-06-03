import About from '@/components/About/About';
import Background from '@/components/Background/Background';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Portfolio from '@/components/Portfolio/Portfolio';
import { Messages, PageProps } from '@/utils/types.d';
import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as Messages;
  const meta = messages.MetaTags;
  return {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    authors: [{ name: meta?.author }],
    openGraph: {
      title: meta?.ogTitle,
      description: meta?.description,
      images: [meta?.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.ogTitle,
      description: meta?.description,
      images: [meta?.twitterImage],
    },
  };
}

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main style={{ overflow: 'hidden' }}>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
