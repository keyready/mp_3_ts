import { lazy } from 'react';

export const AdminPanelLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./AdminPanel'));
    }, 500);
}));
