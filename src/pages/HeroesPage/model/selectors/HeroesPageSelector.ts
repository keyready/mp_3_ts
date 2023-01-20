import { StateSchema } from 'app/providers/StoreProvider';

export const getHeroesIsLoading = (state: StateSchema) => state.heroesPage?.isLoading;
export const getHeroesError = (state: StateSchema) => state.heroesPage?.error;

export const getHeroesPageInited = (state: StateSchema) => state.heroesPage?._inited;
