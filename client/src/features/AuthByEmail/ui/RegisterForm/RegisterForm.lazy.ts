import { FC, lazy } from 'react';
import { RegisterFormProps } from './RegisterForm';

export const RegisterForm = lazy<FC<RegisterFormProps>>(async () => new Promise((res) => {
    setTimeout(() => {
        res(import('./RegisterForm'));
    }, LOADING_DELAY);
}));
