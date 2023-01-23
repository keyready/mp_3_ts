import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getUserToken } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useSelector(getUserToken);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
