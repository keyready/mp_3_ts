import { Suspense, useCallback } from 'react';
import { AppRoutesProps, routerConfig } from 'shared/config/routeConfig/routeConfig';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const renderWithSuspense = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<h3>Loading...</h3>}>
                <div className="page">
                    {route.element}
                </div>
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routerConfig).map(renderWithSuspense)}
        </Routes>
    );
};

export default AppRouter;
