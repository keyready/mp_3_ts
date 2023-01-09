import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getHeroes = (state: StateSchema) => state.hero.data;
export const getIsLoading = (state: StateSchema) => state.hero.isLoading;
export const getError = (state: StateSchema) => state.hero.error;
