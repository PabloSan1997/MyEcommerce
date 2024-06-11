/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { readOneProductExtraReducer } from '../splice/extraReducer/productExtraReducer';
import '../styles/oneProduct.scss';
import { ImagenesArea } from '../components/ImagenesArea';
import { ShoppingCartIcon, PencilIcon } from '@heroicons/react/24/solid';
import { setCarritoExtraReducer } from '../splice/extraReducer/carritoExtraReducer';
import { stringRoutes } from '../utilities/routes';

export function OneProduct() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const oneProduct = state.oneProduct;
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(readOneProductExtraReducer({ token: state.token, id }));
  }, []);

  const agregarCarrito = () => {
    dispatch(setCarritoExtraReducer({ token: state.token, carrito: { total: 1, productId: id } }))
      .then(() => {
        navigate(stringRoutes.carrito);
      });
  }


  const imagenes = [oneProduct.urlImage, ...oneProduct.productDescription.imagenes];
  return (
    <main className="one_product_container">
      {state.isAdmin ? (
        <button className="edit_option" onClick={() => navigate(`${stringRoutes.editProduct}?id=${id}`)}>
          <span className="text_option">Edit</span>
          <PencilIcon className='icono_pencil' />
        </button>
      ) : null}
      <section className="superior">
        <ImagenesArea imagenes={imagenes} className='pro der' />
        <div className="pro izq">
          <h2 className='titulo_style'>{oneProduct.name}</h2>
          <span className='price'>${oneProduct.price}</span>
          <span 
            className='category'
            onClick={() => navigate(`${stringRoutes.category}?name=${oneProduct.category.name}`)}
          >{oneProduct.category.name}</span>
          <p className="description">{oneProduct.productDescription.description}</p>
          <div className="buttons_area">
            {oneProduct.inStock ? (
              <>
                <button className='comprar'>Comprar</button>
                <button
                  className='carrito'
                  onClick={agregarCarrito}
                >Agregar a <ShoppingCartIcon className='car' /></button>
              </>
            ) :
              <p className='message'>No disponible</p>}
          </div>
        </div>
      </section>
      <section className="inferior">
        <h3 className='titulo_style'>Especificaciones</h3>
        <p className="especificaciones">{oneProduct.productDescription.specifications}</p>
      </section>
    </main>
  );
}
