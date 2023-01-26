import { lazy } from 'react';

export const CreateHeroPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./CreateHeroPage'));
    }, 500);
}));
