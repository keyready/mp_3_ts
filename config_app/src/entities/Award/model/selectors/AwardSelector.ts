import { StateSchema } from 'app/providers/StoreProvider';

export const getAwardData = (state: StateSchema) => state.award?.data;
export const getAwardIsLoading = (state: StateSchema) => state.award?.data;
export const getAwardError = (state: StateSchema) => state.award?.error;
