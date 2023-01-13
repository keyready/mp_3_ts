import { RouteProps } from 'react-router-dom';
import { RegisterPage } from 'pages/RegisterPage';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { AddHeroPage } from 'pages/AddHeroPage';
import { LoginPage } from 'pages/LoginPage';
import { ProfilePage } from 'pages/ProfilePage';
import { AdminPanel } from 'pages/AdminPanel';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    ADDHERO = 'addHero',
    LOGIN = 'login',
    REGISTER = 'register',
    PROFILE = 'profile',
    ADMINPANEL = 'adminPanel'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADDHERO]: '/addHero',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ADMINPANEL]: '/admin',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.ADDHERO]: {
        path: RoutePath.addHero,
        element: <AddHeroPage />,
        authOnly: true,
    },
    [AppRoutes.ADMINPANEL]: {
        path: RoutePath.adminPanel,
        element: <AdminPanel />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
};
