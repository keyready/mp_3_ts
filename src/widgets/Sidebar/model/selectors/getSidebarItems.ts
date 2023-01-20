import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assests/icons/home.svg';
import AboutIcon from 'shared/assests/icons/about.svg';
import HeroesIcon from 'shared/assests/icons/heroes.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная',
                Icon: MainIcon,
            },
            {
                path: RoutePath.about,
                text: 'О проекте',
                Icon: AboutIcon,
            },
            {
                path: RoutePath.heroes,
                text: 'Наш полк',
                Icon: HeroesIcon,
            },
        ];
        if (userData) {
            SidebarItemsList.push();
        }

        return SidebarItemsList;
    },
);
