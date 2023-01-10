import { lazy } from 'react';

export const AddHeroPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./AddHeroPage'));
    }, 500);
}));
