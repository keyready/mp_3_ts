import { lazy } from 'react';

export const HeroesPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./HeroesPage'));
    }, 500);
}));
