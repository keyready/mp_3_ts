import { lazy } from 'react';

export const ForbiddenPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./ForbiddenPage'));
    }, 500);
}));
