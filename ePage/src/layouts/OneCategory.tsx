/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { readOneCategoryExtraReducer } from '../splice/extraReducer/productExtraReducer';
import { ProductOptionCategory } from '../components/ProductOptionCategory';

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
  return (
    <div className="category_container">
      <h2>{category.name}</h2>
      <div className="product_area">
        {category.products.map(p => (
          <ProductOptionCategory key={p.id} {...p}/>
        ))}
      </div>
    </div>
  );
}
