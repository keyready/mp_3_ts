import { StateSchema } from 'app/providers/StoreProvider';

export const getHeroData = (state: StateSchema) => state.hero?.data;
export const getHeroDataIsLoading = (state: StateSchema) => state.hero?.isLoading || false;
export const getHeroDataError = (state: StateSchema) => state.hero?.error || '';
