import Banner from "../components/banner";
import CategoryProduct from "./categoryProduct";
import Faqpage from "./faq";
//import Faq from "../components/home/Faq";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Banner/>
        <CategoryProduct/>
        <Faqpage/>
      </div>
    </>
  );
};
export default HomePage;
