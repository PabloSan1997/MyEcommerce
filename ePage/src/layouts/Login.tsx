import { useAppDispatch, useAppSelector } from "../hooks";
import { loginExtraReducer } from "../splice/extraReducer/userExtraReducers";
import { formActions } from "../splice/formsSlice";


export function Login() {
    const state = useAppSelector(state => state.formReducer.login);
    const message = useAppSelector(state => state.commerseReducer.message);
    const dispatch = useAppDispatch();
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginExtraReducer(state));
    }
    return (
        <form className="login_form form" onSubmit={submit}>
            <h2>Login</h2>
            <label htmlFor="">Email</label>
            <input
                type="text"
                placeholder="Escribir..."
                value={state.email}
                onChange={e => dispatch(formActions.escribirLogin({ ...state, email: e.target.value }))}
            />
            <label htmlFor="">Contraseña</label>
            <input
                type='password'
                placeholder="Escribir..."
                value={state.password}
                onChange={e => dispatch(formActions.escribirLogin({ ...state, password: e.target.value }))}
            />
            <button type="submit">Entrar</button>
            <p className="error">{message}</p>
        </form>
    );
}