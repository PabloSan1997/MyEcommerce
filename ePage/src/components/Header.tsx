/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commersActions } from "../splice/commerSlice";
import { stringRoutes } from "../utilities/routes";
import '../styles/header.scss';
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { viewAdmninExtraReducer } from "../splice/extraReducer/userExtraReducers";


export default function Header() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(viewAdmninExtraReducer({ token: state.token }));
    }, [state.token]);

    return (
        <header>
            <h1>Mi Tienda</h1>
            <div className="button_part">
                {
                    state.token ? (
                        <>
                            <nav className="inside">
                                <Link to={stringRoutes.home}>Home</Link>
                                <span
                                    onMouseEnter={() => setShow(true)}
                                >{state.userInfo.name}</span>
                                {
                                    show ? (
                                        <ul
                                            onClick={()=> setShow(false)}
                                            className="my_menu"
                                            onMouseLeave={() => setShow(false)}
                                        >
                                            <Link
                                                className="car op"
                                                to={stringRoutes.carrito}
                                            >Carrito <ShoppingCartIcon className="carrito" /></Link>
                                            {state.isAdmin ?
                                                <Link to={stringRoutes.adminmode} className="op">Admin</Link>
                                                : null}
                                            <button
                                                className="op"
                                                onClick={() => dispatch(commersActions.logout())}
                                            >Logout</button>
                                        </ul>
                                    ) : null
                                }
                            </nav>
                        </>
                    ) : (
                        <nav className="logins">
                            <NavLink className={({ isActive }) => isActive ? 'desactive' : 'sec'} to={stringRoutes.login}>Login</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'desactive' : 'sec'} to={stringRoutes.register}>Register</NavLink>
                        </nav>
                    )
                }
            </div>
        </header>
    );
}
