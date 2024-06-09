/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCategoryExtraReducer, readCategoriesExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { TrashIcon } from '@heroicons/react/24/solid';
import '../styles/admin.scss';
import { useNavigate } from "react-router-dom";
import { stringRoutes } from "../utilities/routes";

export function Admin() {
  const distpatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const navigate = useNavigate();

  const deleteCarrito =(id:number)=>{
    distpatch(deleteCategoryExtraReducer({token:state.token, id}))
  }

  useEffect(() => {
    distpatch(readCategoriesExtraReducer({ token: state.token }));
  }, []);
  return (
    <div className="admin_mode">
      <button
        className="admin_button"
        onClick={()=>navigate(stringRoutes.adminAddProduct)}
      >Agregar nuevo producto</button>
      <button
        className="admin_button"
        onClick={()=>navigate(stringRoutes.addCategory)}
      >Agregar Categoría</button>
      <div className="lista_categorias">
        {state.categories.map(c => (
          <div className="category_list" key={c.id}>
            <TrashIcon className="icono" onClick={()=>deleteCarrito(c.id)}/>
            <span className="category">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
