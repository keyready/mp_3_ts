import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getIsUserInited } from 'entities/User/model/selector/UserSelector';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useSelector(getIsUserInited);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
    }

    return children;
}
