import { Route, Routes, Navigate } from 'react-router-dom';
import GuardedRoute from '../../utils/guarded-route';
import { ROUTES } from "../../constants/routes";
import { lazy } from "react";

const PagesSignIn = lazy(() => import("../../pages/pages-sign-in"));
const PagesSignUp = lazy(() => import("../../pages/pagest-sign-up"));
const PagesHome = lazy(() => import("../../pages/pages-home"));

interface AppRoutesProp {
    isAuthenticated: boolean;
}

const AppRouter = (props: AppRoutesProp): JSX.Element => {
    const { isAuthenticated } = props;

    return (
        <Routes>
            <Route path={ROUTES.SIGN_IN} element={ <PagesSignIn /> } />
            <Route path={ROUTES.SING_UP} element={ <PagesSignUp /> } />
            <Route path={ROUTES.HOME} element={
                <GuardedRoute
                    isRouteAccessible={isAuthenticated}
                    >
                    <PagesHome />
                </GuardedRoute>
            } />
            <Route path="*" element={<p>Page Not Found</p>} />
            <Route path="/" element={ <Navigate replace to={ROUTES.SIGN_IN} /> }/>
        </Routes>
    );
};

export default AppRouter;
