/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readCategoriesExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { Link } from "react-router-dom";
import '../styles/carritoListStyles.scss'

export function CategoryList() {
    const state = useAppSelector(state => state.commerseReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(readCategoriesExtraReducer({ token: state.token }));
    }, []);
    return (
        <nav className="category_area">
            <h2>Categorias</h2>
           <ul>
           {
                state.categories.map(c => (
                    <li key={c.id}><Link key={c.id} to={`/category?name=${c.name}`}>{c.name}</Link></li>
                ))
            }
           </ul>
        </nav>
    );
}
