/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryList } from "../components/CategoryList";
import { ProductsList } from "../components/ProductsList";
import '../styles/home.scss';

export function Home() {


  return (
    <div className="container">
      <section className="menus">
        <CategoryList />
      </section>
      <section className="main_part">
        <ProductsList />
      </section>
    </div>
  );
}
