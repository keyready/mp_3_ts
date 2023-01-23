import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/mainPage';
import { AboutPage } from 'pages/aboutPage';
import { NotFound } from 'pages/NotFound';
import { HeroesPage } from 'pages/HeroesPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { ProfilePage } from 'pages/ProfilePage';
import { CreateHeroPage } from 'pages/CreateHeroPage';
import { AdminPage } from 'pages/adminPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    adminOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    HEROES = 'heroes',
    FORBIDDEN = 'forbidden',
    PROFILE = 'profile',
    CREATEHERO = 'create_hero',
    ADMINPAGE = 'admin_age',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.HEROES]: '/heroes',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.CREATEHERO]: '/createHero',
    [AppRoutes.ADMINPAGE]: '/admin/page',

    // last
    [AppRoutes.NOT_FOUND]: '/*',
    [AppRoutes.FORBIDDEN]: '/forbidden',
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
    [AppRoutes.HEROES]: {
        path: RoutePath.heroes,
        element: <HeroesPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.CREATEHERO]: {
        path: RoutePath.create_hero,
        element: <CreateHeroPage />,
        authOnly: true,
    },
    [AppRoutes.ADMINPAGE]: {
        path: RoutePath.admin_age,
        element: <AdminPage />,
        authOnly: true,
        adminOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
    },
};
