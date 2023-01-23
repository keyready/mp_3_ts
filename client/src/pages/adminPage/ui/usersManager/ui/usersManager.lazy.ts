import { lazy } from 'react';

export const usersManagerLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./usersManager'));
    }, 500);
}));
