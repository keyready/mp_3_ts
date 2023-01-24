import React, { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routerConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/UI/PageLoader';
import { RequireAuth } from 'app/providers/AppRouter/ui/RequireAuth';
import { RequireAdmin } from 'app/providers/AppRouter/ui/RequireAdmin';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

const AppRouter = () => {
    const userData = useSelector(getUserAuthData);
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        let checkedElement;
        if (route.adminOnly) {
            checkedElement = <RequireAdmin>{element}</RequireAdmin>;
        } else if (route.authOnly) {
            checkedElement = <RequireAuth>{element}</RequireAuth>;
        } else checkedElement = element;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={checkedElement}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routerConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default AppRouter;
