import About from '@/components/About/About';
import Background from '@/components/Background/Background';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Portfolio from '@/components/Portfolio/Portfolio';


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
