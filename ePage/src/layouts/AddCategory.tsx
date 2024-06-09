import React, { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addCategoryExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { formActions } from "../splice/formsSlice";

export function AddCategory() {
    const thecategory = useAppSelector(state => state.formReducer.category);
    const state = useAppSelector(state => state.commerseReducer);
    const dispatch = useAppDispatch();

    const submit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        dispatch(addCategoryExtraReducer({token: state.token, category:thecategory}));
    }
  return (
    <form onSubmit={submit}>
        <h2>Agregar Categoria</h2>
        <label htmlFor="">Name</label>
            <input
                className='entrada'
                type='text'
                value={thecategory.name}
                onChange={e => dispatch(formActions.escribirCategory({...thecategory, name:e.target.value}))}
            />
            <label htmlFor="">Url image</label>
            <input
                className='entrada'
                type='text'
                value={thecategory.urlImage}
                onChange={e => dispatch(formActions.escribirCategory({...thecategory, urlImage:e.target.value}))}
            />
            <button type="submit">Agregar</button>
    </form>
  );
}
