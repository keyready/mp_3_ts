import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getUserAuthData } from 'entities/User';

export function RequireAdmin({ children }: { children: JSX.Element }) {
    const userData = useSelector(getUserAuthData);
    const location = useLocation();

    if (userData?.role !== 'admin') {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
