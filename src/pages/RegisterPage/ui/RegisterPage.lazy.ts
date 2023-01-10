import { lazy } from 'react';

export const RegisterPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./RegisterPage'));
    }, 500);
}));
