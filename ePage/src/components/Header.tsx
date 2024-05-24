import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commersActions } from "../splice/commerSlice";
import { stringRoutes } from "../utilities/routes";


export default function Header() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    return (
        <header>
            <h1>Tienda</h1>
            {
                state.token ? (<button
                    onClick={() => dispatch(commersActions.logout())}
                >Logout</button>) : (
                    <nav>
                        <NavLink to={stringRoutes.login}>Login</NavLink>
                        <NavLink to={stringRoutes.register}>Register</NavLink>
                    </nav>
                )
            }
        </header>
    );
}
