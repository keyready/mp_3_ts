import { lazy } from 'react';

export const ProfilePageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./ProfilePage'));
    }, 500);
}));
