import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from "../constants/routes";

interface GuardedRouteProps {
    isRouteAccessible?: boolean;
    children?: any;
}
const GuardedRoute = ({isRouteAccessible = false, children}: GuardedRouteProps): JSX.Element => {
    const location = useLocation();

    return (isRouteAccessible === true || localStorage.getItem('token')) ? (
        children
    ) : (
        <Navigate to={ROUTES.SIGN_IN} replace state={{ path: location.pathname }} />
    );
}

export default GuardedRoute;