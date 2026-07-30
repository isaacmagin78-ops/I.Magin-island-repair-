import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ServiceArea from './components/ServiceArea';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <ServiceArea />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
