import React, {useContext, useEffect} from 'react';
import { withProviders } from "./providers";
import AppRouter from "../component/app-router/app-router";
import Layout from '../layouts/main-layout';
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import { ToastContainer } from 'react-toastify';


const App = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    return (
        <Layout>
            <AppRouter isAuthenticated={store.isAuth} />
            <ToastContainer />
        </Layout>
    );
};

export default observer(
    withProviders(App)
);
