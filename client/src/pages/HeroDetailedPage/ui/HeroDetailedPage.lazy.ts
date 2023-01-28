import { lazy } from 'react';

export const HeroDetailedPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./HeroDetailedPage'));
    }, 500);
}));
