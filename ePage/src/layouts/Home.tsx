/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryList } from "../components/CategoryList";
import { ProductsList } from "../components/ProductsList";

export  function Home() {

 
  return (
    <div className="container">
      <CategoryList/>
      <ProductsList/>
    </div>
  );
}
