/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCategoryExtraReducer, editCategoryExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { formActions } from "../splice/formsSlice";

export function ListAdmiCategory({ id, name, urlImage }: Category) {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const stateForm = useAppSelector(state => state.formReducer.category);

  useEffect(() => {
    dispatch(formActions.escribirCategory({ urlImage, name }));
  }, [show]);

  const subir = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editCategoryExtraReducer({ token: state.token, category: stateForm, id }));
  }

  const deleteCarrito = () => {
    if (confirm(`¿Desea eliminar categoria: ${name}?`)) {
      dispatch(deleteCategoryExtraReducer({ token: state.token, id }));
    }
  }

  if (show) return (
    <form onSubmit={subir} className="form_category_admin">
        <label htmlFor="">Nombre</label>
        <input
          type="text"
          placeholder="Escribir"
          value={stateForm.name}
          onChange={e => dispatch(formActions.escribirCategory({ ...stateForm, name: e.target.value }))}
        />
        <label htmlFor="">Url image</label>
        <input
          type="text"
          placeholder="Escribir"
          value={stateForm.urlImage}
          onChange={e => dispatch(formActions.escribirCategory({ ...stateForm, urlImage: e.target.value }))}
        />
        <div className="area_buttons_form">
          <button type="submit">Aceptar</button>
          <button onClick={() => setShow(false)} type="button">Cancelar</button>
        </div>
    </form>
  )
  return (
    <div className="category_list">
      <div className="area_icons">
        <PencilIcon className="icono" onClick={() => setShow(true)} />
        <TrashIcon className="icono" onClick={deleteCarrito} />
      </div>
      <span className="category">{name}</span>
    </div>
  );
}
