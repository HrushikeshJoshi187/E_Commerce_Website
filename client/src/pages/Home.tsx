import Hero from "../components/Hero.tsx";
import LatestCollection from "../components/LatestCollection.tsx";
import BestSeller from "../components/BestSeller.tsx";
import OurPolicy from "../components/OurPolicy.tsx";
import NewsLetterBox from "../components/NewsLetterBox.tsx";

const Home = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
