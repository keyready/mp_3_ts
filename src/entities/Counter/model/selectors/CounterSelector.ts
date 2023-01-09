import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getCounterValue = (state: StateSchema) => state.counter.counter;
