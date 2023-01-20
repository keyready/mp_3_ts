import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || '';
export const getLoginRepeatedPassword = (
    state: StateSchema,
) => state?.loginForm?.repeatedPassword || '';
