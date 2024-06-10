/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useSearchParams } from 'react-router-dom';
import { deleteOneProductExtraReducer, editProductExtraReducer, readCategoriesExtraReducer, readOneProductExtraReducer } from "../splice/extraReducer/productExtraReducer";
import { formActions } from "../splice/formsSlice";
import '../styles/productform.scss';

export function EditProduct() {
    const theproduct = useAppSelector(state => state.formReducer.putProduct);
    const state = useAppSelector(state => state.commerseReducer);
    const { token, oneProduct } = state;
    const dispatch = useAppDispatch();
    const [search] = useSearchParams();
    const id = Number(search.get('id'));
    const categorias = state.categories.map(c => c.name);

    const deleteProduct = () => {
        if (confirm('¿Seguro que desea borrar el producto?')) {
            dispatch(deleteOneProductExtraReducer({ token: state.token, id }));
        }
    }

    const subir = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: PutProduct = {
            name: theproduct.name,
            price: theproduct.price,
            urlImage: theproduct.urlImage,
            description: theproduct.description,
            specifications: theproduct.description,
            imagenes: [theproduct.image1, theproduct.image2, theproduct.image3],
            category: theproduct.category,
            inStock: theproduct.inStock
        }
        dispatch(editProductExtraReducer({ id, token, data }));
    }

    useEffect(() => {
        dispatch(readOneProductExtraReducer({ token, id }));
        dispatch(readCategoriesExtraReducer({ token }));
    }, []);

    useEffect(() => {
        if (oneProduct.name) {
            dispatch(formActions.escribirPutProduct({
                name: oneProduct.name,
                price: oneProduct.price,
                urlImage: oneProduct.urlImage,
                description: oneProduct.productDescription.description,
                specifications: oneProduct.productDescription.description,
                image1: oneProduct.productDescription.imagenes[0],
                image2: oneProduct.productDescription.imagenes[1],
                image3: oneProduct.productDescription.imagenes[2],
                category: oneProduct.category.name,
                inStock: oneProduct.inStock
            }));
        }
    }, [oneProduct.name]);

    return (
        <form className="editProyect form_proyect" onSubmit={subir}>
            <h2 className="titulo_style">Editar Producto</h2>
            <label htmlFor="">Name</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.name}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, name: e.target.value }))}
            />
            <label htmlFor="">Price</label>
            <input
                className='entrada'
                type='number'
                step={0.01}
                min={0}
                value={theproduct.price}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, price: Number(e.target.value) }))}
            />
            <label htmlFor="">Portada</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.urlImage}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, urlImage: e.target.value }))}
            />
            <label htmlFor="">Imagen 1</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image1}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, image1: e.target.value }))}
            />
            <label htmlFor="">Imagen 2</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image2}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, image2: e.target.value }))}
            />
            <label htmlFor="">Imagen 3</label>
            <input
                className='entrada'
                type="text"
                value={theproduct.image3}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, image3: e.target.value }))}
            />
            <label htmlFor="">Description</label>
            <textarea
                className='entrada textarea'
                value={theproduct.description}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, description: e.target.value }))}
            ></textarea>
            <label htmlFor="">Especificaciones</label>
            <textarea
                className='entrada textarea'
                value={theproduct.specifications}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, specifications: e.target.value }))}
            ></textarea>
            <label htmlFor="">Categorias</label>
            <select
                className="entrada seleccion"
                value={theproduct.category}
                onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, category: e.target.value }))}
            >
                {categorias.map(o => (
                    <option value={o} key={o}>{o}</option>
                ))}
            </select>
            <div className="check_part">
                <input
                    type='checkbox'
                    id='checkbox'
                    className="disponible"
                    checked={theproduct.inStock}
                    onChange={e => dispatch(formActions.escribirPutProduct({ ...theproduct, inStock: e.target.checked }))}
                />
                <label htmlFor="checkbox" id="label">Disponible:</label>
            </div>
            <div className="area_buttons">
                <button type="submit">Aceptar</button>
                <button type="button" onClick={deleteProduct}>Eliminar Producto</button>
            </div>
        </form>
    );
}
