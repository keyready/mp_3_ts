import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUserData = (state: StateSchema) => state.user.data;
export const getAllUsers = (state: StateSchema) => state.users.data;
export const getAllUsersIsLoading = (state: StateSchema) => state.users.isLoading;
export const getAllUsersError = (state: StateSchema) => state.users.error;
export const getIsUserInited = (state: StateSchema) => state.user.isInited;
