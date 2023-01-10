import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/RouteProvider';
import { Navbar } from 'widgets/Navbar/';

export const App = () => (
    <div className={classNames('app', {}, [])}>
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="page__wrapper">
                <AppRouter />
            </div>
        </Suspense>
    </div>
);
