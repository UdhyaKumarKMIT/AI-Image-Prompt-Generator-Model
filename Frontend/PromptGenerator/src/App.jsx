import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SampleImages from "./components/SampleImages";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <br></br>
        <SampleImages />
        <br></br>
        <br></br>
        <Footer />
      </div>
    </>
  );
};

export default App;
