/* eslint-disable react-hooks/exhaustive-deps */

import { useAppDispatch, useAppSelector } from "../hooks";
import { formActions } from "../splice/formsSlice";
import { Navigate } from "react-router-dom";
import { stringRoutes } from "../utilities/routes";
import React, { useEffect } from "react";
import { commersActions } from "../splice/commerSlice";
import { registerExtraReducer } from "../splice/extraReducer/userExtraReducers";

export function Register() {
    const state = useAppSelector(state => state.formReducer.register);
    const dispatch = useAppDispatch();
    const { message, token } = useAppSelector(state => state.commerseReducer);

    useEffect(()=>{
        dispatch(commersActions.borrarMessage());
    },[]);

    const subir = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        dispatch(registerExtraReducer(state));
    }

    if (token) return <Navigate to={stringRoutes.home} />
    return (
        <form className="register_form form" onSubmit={subir}>
            <h2>Register</h2>
            <label htmlFor="">Email</label>
            <input
                type="text"
                placeholder="Escribir..."
                value={state.email}
                onChange={e => dispatch(formActions.escribirRegister({ ...state, email: e.target.value }))}
            />
            <label htmlFor="">Contraseña</label>
            <input
                type='password'
                placeholder="Escribir..."
                value={state.password}
                onChange={e => dispatch(formActions.escribirRegister({ ...state, password: e.target.value }))}
            />
            <label htmlFor="">Nombre</label>
            <input
                type='text'
                placeholder="Escribir..."
                value={state.name}
                onChange={e => dispatch(formActions.escribirRegister({ ...state, name: e.target.value }))}
            />
            <button type="submit" className="theboton">Entrar</button>
            <p className="error">{message}</p>
        </form>
    );
}
