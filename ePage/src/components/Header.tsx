import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commersActions } from "../splice/commerSlice";
import { stringRoutes } from "../utilities/routes";
import '../styles/header.scss';

export default function Header() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    return (
        <header>
            <h1>Tienda</h1>
            <div className="button_part">
                {
                    state.token ? (
                        <>
                            <nav>
                                <Link to={stringRoutes.home}>Home</Link>
                                <Link to={stringRoutes.carrito}>{state.userInfo.name}</Link>
                            </nav>
                            <button
                                onClick={() => dispatch(commersActions.logout())}
                            >Logout</button>
                        </>
                    ) : (
                        <nav className="logins">
                            <NavLink className={({isActive})=>isActive?'desactive':'sec'} to={stringRoutes.login}>Login</NavLink>
                            <NavLink className={({isActive})=>isActive?'desactive':'sec'} to={stringRoutes.register}>Register</NavLink>
                        </nav>
                    )
                }
            </div>
        </header>
    );
}
