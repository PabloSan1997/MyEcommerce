/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { carritoExtraReducer } from "../splice/extraReducer/carritoExtraReducer";
import { OneCarrito } from "../components/OneCarrito";


export function Carritos() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    useEffect(() => {
        dispatch(carritoExtraReducer({ token: state.token }));
    }, []);

    return (
        <div className="carritos">
            <h2>Mi carrito</h2>
            {state.carrito.map(c => (
                <OneCarrito key={c.id} {...c}/>
            ))}
        </div>
    );
}