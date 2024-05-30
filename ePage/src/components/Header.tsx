import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commersActions } from "../splice/commerSlice";
import { stringRoutes } from "../utilities/routes";
import '../styles/header.scss';
import { useState } from "react";

export default function Header() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    const [show, setShow] = useState(false);
    return (
        <header>
            <h1>Tienda</h1>
            <div className="button_part">
                {
                    state.token ? (
                        <>
                            <nav className="inside">
                                <Link to={stringRoutes.home}>Home</Link>
                                <span
                                onMouseEnter={()=>setShow(true)}
                                >{state.userInfo.name}</span>
                                {
                                    show ? (
                                        <ul 
                                        className="my_menu"
                                        onMouseLeave={()=>setShow(false)}
                                        >
                                            <Link className="car op" to={stringRoutes.carrito}>Carrito</Link>
                                            <button className="op" onClick={() => dispatch(commersActions.logout())}>Logout</button>
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
