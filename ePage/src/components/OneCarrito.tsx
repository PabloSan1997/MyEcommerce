import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCarritoExtraReducer, editCarritoExtraReducer } from "../splice/extraReducer/carritoExtraReducer";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import { stringRoutes } from "../utilities/routes";

export function OneCarrito({ total, price, products, totalPrice, id }: CarritoRespnse) {
  const navigate = useNavigate();
  const { name, urlImage} = products;
  const [num, setNum] = useState(1);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.commerseReducer.token);
  const chancheCar = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editCarritoExtraReducer({token, id, carrito:{total:num}}));
  }
  const eliminar = () => {
    dispatch(deleteCarritoExtraReducer({token, id}));
  }
  useEffect(() => {
    setNum(total);
  }, [total]);
  return (
    <div className="carrito_option">
      <TrashIcon className="trash" onClick={eliminar}/>
      <img src={urlImage} alt={name} onClick={()=>navigate(`${stringRoutes.product}/${products.id}`)}/>
      <div className="area_texto">
        <h3>{name}</h3>
        <p>{}</p>
        <div className="area_info">
          <span className="price">Precio: ${price}</span>
          <span className="total_price">Total a pagar: ${totalPrice}</span>
          <form onSubmit={chancheCar}>
            <label htmlFor="tot">Total</label>
            <input 
            type="number" 
            value={num} step={1} 
            min={1} 
            onChange={e => setNum(Number(e.target.value))}
            id='tot'
            />
            <button type="submit" disabled={num === total}>Cambiar</button>
          </form></div>
      </div>
    </div>
  );
}
