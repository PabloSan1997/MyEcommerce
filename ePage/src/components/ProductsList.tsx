/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readProductsExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { ProductOption } from "./ProductOption";
import '../styles/productList.scss'

export function ProductsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  useEffect(()=>{
    dispatch(readProductsExtraReducer({token:state.token}));
  },[]);
  return (
    <div className="product_area">
        {state.products.map(p=>(
          <ProductOption key={p.id} {...p}/>
        ))}
    </div>
  );
}
