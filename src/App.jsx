import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ForRecruiters from './components/ForRecruiters';
import FeatureSuggestion from './components/FeatureSuggestion';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ForRecruiters />
        <FeatureSuggestion />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
