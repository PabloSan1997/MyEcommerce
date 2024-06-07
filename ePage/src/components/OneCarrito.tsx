import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { editCarritoExtraReducer } from "../splice/extraReducer/carritoExtraReducer";


export function OneCarrito({ total, price, products, totalPrice, id }: CarritoRespnse) {
  const { name, urlImage } = products;
  const [num, setNum] = useState(1);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.commerseReducer.token);
  const cambiar = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editCarritoExtraReducer({token, id, carrito:{total:num}}));
  }
  useEffect(() => {
    setNum(total);
  }, [total]);
  return (
    <div className="carrito_option">
      <img src={urlImage} alt={name} />
      <div className="area_texto">
        <h3>{name}</h3>
        <p>{}</p>
        <div className="area_info">
          <span className="price">Precio: ${price}</span>
          <span className="total_price">Total a pagar: ${totalPrice}</span>
          <form onSubmit={cambiar}>
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
