/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryList } from "../components/CategoryList";
import { Loading } from "../components/Loading";
import { ProductsList } from "../components/ProductsList";
import { useAppSelector } from "../hooks";
import '../styles/home.scss';

export function Home() {

  const loading = useAppSelector(state => state.commerseReducer.loading);
  if(loading) return <Loading/>
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
