import { FC, lazy } from 'react';
import { FormProps } from './Form';

export const FormLazy = lazy<FC<FormProps>>(async () => new Promise((res) => {
    setTimeout(() => {
        res(import('./Form'));
    }, LOADING_DELAY);
}));
