import HeroSection from '../components/home/HeroSection';
import PropertyCarousel from '../components/home/PropertyCarousel';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PropertyCarousel />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
}
