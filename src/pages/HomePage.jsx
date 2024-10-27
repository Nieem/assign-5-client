import Banner from "../components/banner";
import CategoryProduct from "./categoryProduct";
import Faqpage from "./faq";
import { Helmet } from "react-helmet-async";
//import Faq from "../components/home/Faq";

const HomePage = () => {
  return (
    <><Helmet>
      <title> BD BOOK ZONE | Home</title>
    </Helmet>
      <div className="">
        <Banner/>
        <CategoryProduct/>
        <Faqpage/>
      </div>
    </>
  );
};
export default HomePage;
