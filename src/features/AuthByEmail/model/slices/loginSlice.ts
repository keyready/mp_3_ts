/**
 *   Новый тип комментов, хыы
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import {
    registerByEmail,
} from '../services/registerByEmail/registerByEmail';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { confirmEmail } from '../services/confirmEmail/confirmEmail';

const initialState: LoginSchema = {
    username: '',
    password: '',
    repeatedPassword: '',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setFirstname: (state, action:PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        setMiddlename: (state, action:PayloadAction<string>) => {
            state.middlename = action.payload;
        },
        setLastname: (state, action:PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        setUsername: (state, action:PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action:PayloadAction<string>) => {
            state.password = action.payload;
        },
        setRepPassword: (state, action:PayloadAction<string>) => {
            state.repeatedPassword = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registerByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(confirmEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(confirmEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(confirmEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
