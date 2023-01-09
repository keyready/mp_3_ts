import { lazy } from 'react';

export const AboutPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./AboutPage'));
    }, 500);
}));
