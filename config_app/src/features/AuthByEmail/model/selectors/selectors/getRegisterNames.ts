import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterFirstname = (state: StateSchema) => state.loginForm?.firstname;
export const getRegisterMiddlename = (state: StateSchema) => state.loginForm?.middlename;
export const getRegisterLastname = (state: StateSchema) => state.loginForm?.lastname;
