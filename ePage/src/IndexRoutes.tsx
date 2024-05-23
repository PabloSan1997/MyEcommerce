
import {useRoutes, HashRouter, Navigate} from 'react-router-dom';
import { stringRoutes } from './utilities/routes';
import { Home } from './layouts/Home';
import { Login } from './layouts/Login';
import { useAppSelector } from './hooks';

 function Redirect() {
    const token = useAppSelector(state => state.commerseReducer.token);
    const ruta = token?stringRoutes.home:stringRoutes.login;
    return <Navigate to={ruta}/>
}



const Routes = () => useRoutes([
    {
        path:stringRoutes.home,
        element:<Home/>
    },
    {
        path:stringRoutes.login,
        element:<Login/>
    },
    {
        path:'/',
        element:<Redirect/>
    }
]);



export function ProviderRoutes(){
    return(
        <HashRouter>
            <Routes/>
        </HashRouter>
    );
}