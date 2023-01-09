import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAwards = (state: StateSchema) => state.award.data;
