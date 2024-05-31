/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { readOneProductExtraReducer } from '../splice/extraReducer/productExtraReducer';
import '../styles/oneProduct.scss';
import { ImagenesArea } from '../components/ImagenesArea';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export function OneProduct() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    const oneProduct = state.oneProduct;

    useEffect(()=>{
        dispatch(readOneProductExtraReducer({token:state.token, id}));
    },[]);

    const imagenes = [oneProduct.urlImage, ...oneProduct.productDescription.imagenes];
  return  (
    <main className="one_product_container">
        <section className="superior">
          <ImagenesArea imagenes={imagenes} className='pro der'/>
          <div className="pro izq">
            <h2>{oneProduct.name}</h2>
            <span className='price'>${oneProduct.price}</span>
            <span className='category'>{oneProduct.category.name}</span>
            <p className="description">{oneProduct.productDescription.description}</p>
            <div className="buttons_area">
              <button className='comprar'>Comprar</button>
              <button className='carrito'>Agregar a <ShoppingCartIcon className='car'/></button>
            </div>
          </div>
        </section>
        <section className="inferior">
          <h3>Especificaciones</h3>
          <p className="especificaciones">{oneProduct.productDescription.specifications}</p>
        </section>
    </main>
  );
}
