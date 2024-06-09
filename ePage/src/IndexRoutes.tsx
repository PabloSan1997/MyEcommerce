/* eslint-disable react-hooks/exhaustive-deps */

import { useRoutes, HashRouter, Navigate } from 'react-router-dom';
import { stringRoutes } from './utilities/routes';
import { Home } from './layouts/Home';
import { Login } from './layouts/Login';
import { useAppDispatch, useAppSelector } from './hooks';
import Header from './components/Header';
import { Register } from './layouts/Register';
import { Carritos } from './layouts/Carritos';
import { useEffect } from 'react';
import { readInfoUserExtraReducer } from './splice/extraReducer/userExtraReducers';
import { OneCategory } from './layouts/OneCategory';
import { OneProduct } from './layouts/OneProduct';
import { EditProduct } from './layouts/EditProduct';
import { Admin } from './layouts/Admin';
import { AddProduct } from './layouts/AddProduct';
import { AddCategory } from './layouts/AddCategory';

function Redirect() {
    const token = useAppSelector(state => state.commerseReducer.token);
    const ruta = token ? stringRoutes.home : stringRoutes.login;
    return <Navigate to={ruta} />
}

function Viewtoken({ children }: Children) {
    const token = useAppSelector(state => state.commerseReducer.token);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (token)
            dispatch(readInfoUserExtraReducer({ token }));
    }, []);
    if (!token)
        return <Navigate to={stringRoutes.login} />
    return (
        <>
            {children}
        </>
    )
}

const Routes = () => useRoutes([
    {
        path: stringRoutes.home,
        element: (
            <>
                <Viewtoken>
                    <Home />
                </Viewtoken>
            </>
        )
    },
    {
        path: stringRoutes.login,
        element: <Login />
    },
    {
        path: '/',
        element: <Redirect />
    },
    {
        path: stringRoutes.register,
        element: <Register />
    },
    {
        path: stringRoutes.carrito,
        element: (
            <Viewtoken>
                <Carritos />
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.category,
        element: (
            <Viewtoken>
                <OneCategory />
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.oneProduct,
        element: (
            <Viewtoken>
                <OneProduct />
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.editProduct,
        element: (
            <Viewtoken>
                <EditProduct />
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.adminmode,
        element: (
            <Viewtoken>
                <Admin />
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.adminAddProduct,
        element:(
            <Viewtoken>
                <AddProduct/>
            </Viewtoken>
        )
    },
    {
        path: stringRoutes.addCategory,
        element:(
            <Viewtoken>
                <AddCategory/>
            </Viewtoken>
        )
    }
]);



export function ProviderRoutes() {
    return (
        <HashRouter>
            <Header />
            <Routes />
        </HashRouter>
    );
}

