/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readCategoriesExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { Link } from "react-router-dom";


export function CategoryList() {
    const state = useAppSelector(state => state.commerseReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(readCategoriesExtraReducer({ token: state.token }));
    }, []);
    return (
        <nav className="category_area">
            {
                state.categories.map(c => (
                    <Link key={c.id} to={`/category?name=${c.name}`}>{c.name}</Link>
                ))
            }
        </nav>
    );
}
