/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { carritoExtraReducer } from "../splice/extraReducer/carritoExtraReducer";
import { OneCarrito } from "../components/OneCarrito";
import '../styles/carrito.scss';
import { Loading } from "../components/Loading";

export function Carritos() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    useEffect(() => {
        dispatch(carritoExtraReducer({ token: state.token }));
    }, []);
    if(state.loading) return <Loading/>;
    return (
        <div className="carritos">
            <h2 className="titulo_style">Mi carrito</h2>
            {state.carrito.length === 0 ? (
                <p className="no_elements">No cuentas con elementos a comprar</p>
            ) :
                state.carrito.map(c => (
                    <OneCarrito key={c.id} {...c} />
                ))
            }
        </div>
    );
}