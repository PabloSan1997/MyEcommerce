/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readCategoriesExtraReducer } from "../splice/extraReducer/productExtraReducer";
import '../styles/admin.scss';
import { useNavigate } from "react-router-dom";
import { stringRoutes } from "../utilities/routes";
import { ListAdmiCategory } from "../components/ListAdmiCategory";
import { Loading } from "../components/Loading";

export function Admin() {
  const distpatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  const navigate = useNavigate();



  useEffect(() => {
    distpatch(readCategoriesExtraReducer({ token: state.token }));
  }, []);
  if(state.loading) return <Loading/>;
  return (
    <div className="admin_mode">
      <div className="area_buttons">
        <button
          className="admin_button"
          onClick={() => navigate(stringRoutes.adminAddProduct)}
        >Agregar nuevo producto</button>
        <button
          className="admin_button"
          onClick={() => navigate(stringRoutes.addCategory)}
        >Agregar Categoría</button>
      </div>
      <div className="lista_categorias">
        <h2 className="titulo_style">Lista de categorías</h2>
        {state.categories.map(c => (
          <ListAdmiCategory key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
