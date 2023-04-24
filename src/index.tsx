import React, { createContext } from 'react';
import { createRoot } from "react-dom/client";
import App from './app/app';
import Store from './store/store';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';


const store = new Store();

interface State {
    store: Store;
}

export const Context = createContext<State>({
    store,
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Context.Provider value={{ store }}>
            <App />
        </Context.Provider>
    </React.StrictMode>,
);
