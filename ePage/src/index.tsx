import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import './styles/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
