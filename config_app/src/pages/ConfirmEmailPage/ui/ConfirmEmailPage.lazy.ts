import { lazy } from 'react';

export const ConfirmEmailPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./ConfirmEmailPage'));
    }, 500);
}));
