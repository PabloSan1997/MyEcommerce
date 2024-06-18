/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { readOneCategoryExtraReducer } from '../splice/extraReducer/productExtraReducer';
import { ProductOptionCategory } from '../components/ProductOptionCategory';
import '../styles/categoryOne.scss';
import { CategoryPortada } from '../components/CategoryPortada';
import { Loading } from '../components/Loading';

export function OneCategory() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const [search] = useSearchParams();
  const name = search.get('name');
  useEffect(() => {
    if (name) {
      dispatch(readOneCategoryExtraReducer({ token: state.token, name }));
    }
  }, []);
  const category = state.oneCategory;
  if(state.loading) return <Loading/>;
  return (
    <div className="category_container">
      <CategoryPortada {...category}/>
      <div className="product_area_category">
        {category.products.map(p => (
          <ProductOptionCategory key={p.id} {...p}/>
        ))}
      </div>
    </div>
  );
}
