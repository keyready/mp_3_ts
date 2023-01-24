import { StateSchema } from 'app/providers/StoreProvider';

export const getUsersAdminPageUsers = (state: StateSchema) => state.usersManagerPage?.data;
export const getUsersAdminPageError = (state: StateSchema) => state.usersManagerPage?.error;
export const getUsersAdminPageIsLoading = (state: StateSchema) => state.usersManagerPage?.isLoading;
export const getAdminPageHeroesIsLoading = (
    state: StateSchema,
) => state.heroesManagerPage?.isLoading;
