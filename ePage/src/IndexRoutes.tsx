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
import { Loading } from './components/Loading';

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

function GenerateLoading({ children }: Children) {
    const loading = useAppSelector(state => state.commerseReducer.loading);
    if (loading) return <Loading />
    return (
        <>
            {children}
        </>
    );
}

const Routes = () => useRoutes([
    {
        path: stringRoutes.home,
        element: (
            <>
                <GenerateLoading>
                    <Viewtoken>
                        <Home />
                    </Viewtoken>
                </GenerateLoading>
            </>
        )
    },
    {
        path: stringRoutes.login,
        element: (
            <Login />
        )
    },
    {
        path: '/',
        element: (
            <GenerateLoading>
                <Redirect />
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.register,
        element: (
            <Register />
        )
    },
    {
        path: stringRoutes.carrito,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <Carritos />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.category,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <OneCategory />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.oneProduct,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <OneProduct />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.editProduct,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <EditProduct />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.adminmode,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <Admin />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.adminAddProduct,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <AddProduct />
                </Viewtoken>
            </GenerateLoading>
        )
    },
    {
        path: stringRoutes.addCategory,
        element: (
            <GenerateLoading>
                <Viewtoken>
                    <AddCategory />
                </Viewtoken>
            </GenerateLoading>
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

