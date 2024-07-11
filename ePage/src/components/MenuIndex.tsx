/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { countProductExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { showTotalProducts } from "../utilities/generateArray";
import { NavLink} from "react-router-dom";

import '../styles/menuLista.scss';

export function MenuIndex({baseUrl}:{baseUrl:string}) {
    const state = useAppSelector(state => state.commerseReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state.token) {
            dispatch(countProductExtraReducer({ token: state.token }));
        }
    }, [state.token]);
    const lista = showTotalProducts.generateArray(state.totalProducts);
    return (
        <div className="menuList">
            {lista.map(l => (
                <NavLink 
                to={`${baseUrl}/${l}`} 
                key={l}
                className={(data)=>data.isActive?'num active':'num'}
                >{l}</NavLink>
            ))}
        </div>
    );
}
