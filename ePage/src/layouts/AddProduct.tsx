

/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addNewProdcuctExtraRedeucer, readCategoriesExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { formActions } from "../splice/formsSlice";
import { Loading } from "../components/Loading";

export function AddProduct() {
    const theproduct = useAppSelector(state => state.formReducer.product);
    const state = useAppSelector(state => state.commerseReducer);
    const { token } = state;
    const dispatch = useAppDispatch();
    const categorias = state.categories.map(c => c.name);
    const subir = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: AddProduct = {
            name: theproduct.name,
            price: theproduct.price,
            urlImage: theproduct.urlImage,
            description: theproduct.description,
            specifications: theproduct.specifications,
            imagenes: [theproduct.image1, theproduct.image2, theproduct.image3],
            category: theproduct.category
        }
        dispatch(addNewProdcuctExtraRedeucer({ token, data }));
    }
    useEffect(() => {
        dispatch(readCategoriesExtraReducer({ token }));
    }, []);
   
    useEffect(() => {
        if (categorias.length>0) {
            dispatch(formActions.escribirProduct({ ...theproduct, category: categorias[0] }));
        }
    }, [categorias.length]);

    if(state.loading) return <Loading/>
    return (
        <form className="add_proyect form_proyect" onSubmit={subir}>
            <h2 className="titulo_style">Nuevo Producto</h2>
            <label htmlFor="">Name</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.name}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, name: e.target.value }))}
            />
            <label htmlFor="">Price</label>
            <input
                className='entrada'
                type='number'
                step={0.01}
                min={0}
                value={theproduct.price}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, price: Number(e.target.value) }))}
            />
            <label htmlFor="">Portada</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.urlImage}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, urlImage: e.target.value }))}
            />
            <label htmlFor="">Imagen 1</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image1}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, image1: e.target.value }))}
            />
            <label htmlFor="">Imagen 2</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image2}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, image2: e.target.value }))}
            />
            <label htmlFor="">Imagen 3</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image3}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, image3: e.target.value }))}
            />
            <label htmlFor="">Description</label>
            <textarea
                className='entrada textarea'
                value={theproduct.description}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, description: e.target.value }))}
            ></textarea>
            <label htmlFor="">Especificaciones</label>
            <textarea
                className='entrada textarea'
                value={theproduct.specifications}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, specifications: e.target.value }))}
            ></textarea>
            <label htmlFor="">Categorias</label>
            <select
                className="entrada seleccion"
                value={theproduct.category}
                onChange={e => dispatch(formActions.escribirProduct({ ...theproduct, category: e.target.value }))}
            >
                {categorias.map(o => (
                    <option value={o} key={o}>{o}</option>
                ))}
            </select>
            <div className="area_buttons">
                <button type="submit">Agregar</button>
            </div>
        </form>
    );
}
