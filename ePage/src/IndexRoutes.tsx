
import {useRoutes, HashRouter} from 'react-router-dom';
import { stringRoutes } from './utilities/routes';
import { Home } from './layouts/Home';
import { Login } from './layouts/Login';


const Routes = () => useRoutes([
    {
        path:stringRoutes.home,
        element:<Home/>
    },
    {
        path:stringRoutes.login,
        element:<Login/>
    }
]);

export function ProviderRoutes(){
    return(
        <HashRouter>
            <Routes/>
        </HashRouter>
    );
}