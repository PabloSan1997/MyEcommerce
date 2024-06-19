/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addCategoryExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { formActions } from "../splice/formsSlice";
import { Loading } from "../components/Loading";
import { commersActions } from "../splice/commerSlice";

export function AddCategory() {
    const thecategory = useAppSelector(state => state.formReducer.category);
    const state = useAppSelector(state => state.commerseReducer);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(commersActions.borrarMessage());
        dispatch(formActions.borrar());
    },[]);
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategoryExtraReducer({ token: state.token, category: thecategory }));
    }
    if (state.loading) return <Loading />
    return (
        <form onSubmit={submit} className="form_proyect">
            <h2 className="titulo_style">Agregar Categoria</h2>
            <label htmlFor="">Name</label>
            <input
                className='entrada'
                type='text'
                value={thecategory.name}
                onChange={e => dispatch(formActions.escribirCategory({ ...thecategory, name: e.target.value }))}
            />
            <label htmlFor="">Url image</label>
            <input
                className='entrada'
                type='text'
                value={thecategory.urlImage}
                onChange={e => dispatch(formActions.escribirCategory({ ...thecategory, urlImage: e.target.value }))}
            />
            <div className="area_buttons">
                <button type="submit">Agregar</button>
            </div>
            {state.message?<p className="error">{state.message}</p>:null}
        </form>
    );
}
