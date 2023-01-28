import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/mainPage';
import { AboutPage } from 'pages/aboutPage';
import { NotFound } from 'pages/NotFound';
import { HeroesPage } from 'pages/HeroesPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { ProfilePage } from 'pages/ProfilePage';
import { CreateHeroPage } from 'pages/CreateHeroPage';
import { AdminPage } from 'pages/adminPage';
import { ConfirmEmailPage } from 'pages/ConfirmEmailPage';
import { HeroDetailedPage } from 'pages/HeroDetailedPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    adminOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    HEROES = 'heroes',
    HERODETAILED = 'hero_detailed',
    FORBIDDEN = 'forbidden',
    PROFILE = 'profile',
    CREATEHERO = 'create_hero',
    ADMINPAGE = 'admin_age',
    CONFIRMPAGE = 'confirm_page',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.HEROES]: '/heroes',
    [AppRoutes.HERODETAILED]: '/hero/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.CREATEHERO]: '/createHero',
    [AppRoutes.ADMINPAGE]: '/admin/page',
    [AppRoutes.CONFIRMPAGE]: '/activate/',

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
    [AppRoutes.HERODETAILED]: {
        path: `${RoutePath.hero_detailed}:heroId`,
        element: <HeroDetailedPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
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
    [AppRoutes.CONFIRMPAGE]: {
        path: `${RoutePath.confirm_page}:link`,
        element: <ConfirmEmailPage />,
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
