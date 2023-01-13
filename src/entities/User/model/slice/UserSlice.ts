import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/config/const';
import { loginByEmail } from '../services/loginByEmail';
import { UserSchema } from '../types/UserSchema';
import { User } from '../types/User';
import { registerUserByEmail } from '../services/registerUserByEmail';

const initialState: UserSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.isInited = true;
        },
        checkAuthData: (state) => {
            const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY) as string;
            console.log(JSON.parse(userData));
            if (userData) {
                state.data = JSON.parse(userData);
                console.log(state.data);
                state.isInited = true;
            }
        },
        logout: (state) => {
            state.data = undefined;
            state.isInited = false;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUserByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerUserByEmail.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(registerUserByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
