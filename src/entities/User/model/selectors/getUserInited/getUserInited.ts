import { StateSchema } from 'app/providers/StoreProvider';

export const getUserInited = (state: StateSchema) => state.user._inited;
export const getUserActivateLink = (state: StateSchema) => state.user._activate_link;
