import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/RouteProvider';
import { Navbar } from 'widgets/Navbar/';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from 'entities/User';
import { getIsUserInited } from 'entities/User/model/selector/UserSelector';

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(UserActions.checkAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <div className="page__wrapper">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
