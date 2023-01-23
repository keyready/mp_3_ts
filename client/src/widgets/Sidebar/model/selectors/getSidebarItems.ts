import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assests/icons/home.svg';
import AboutIcon from 'shared/assests/icons/about.svg';
import HeroesIcon from 'shared/assests/icons/heroes.svg';
import { getUserToken } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserToken,
    (token) => {
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
        ];
        if (token) {
            SidebarItemsList.push({
                path: RoutePath.heroes,
                text: 'Наш полк',
                Icon: HeroesIcon,
            });
        }

        return SidebarItemsList;
    },
);
