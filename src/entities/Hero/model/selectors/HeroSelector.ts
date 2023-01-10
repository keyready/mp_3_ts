import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getHeroData = (state: StateSchema) => state.hero.data;
export const getAllHeroesData = (state: StateSchema) => state.heroes.data;
export const getAllHeroesError = (state: StateSchema) => state.heroes.error;
export const getAllHeroesIsLoading = (state: StateSchema) => state.heroes.isLoading;
export const getHeroError = (state: StateSchema) => state.hero.error;
export const getHeroIsLoading = (state: StateSchema) => state.hero.isLoading;
