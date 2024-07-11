/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readProductsExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { ProductOption } from "./ProductOption";
import '../styles/productList.scss'
import { useParams } from 'react-router-dom';

export function ProductsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const params = useParams();
  const page = Number(params.page);
  useEffect(() => {
    dispatch(readProductsExtraReducer({ token: state.token, page }));
  }, [page]);
  return (
    <div className="product_area">
      {state.products.map(p => (
        <ProductOption key={p.id} {...p} />
      ))}
    </div>
  );
}
