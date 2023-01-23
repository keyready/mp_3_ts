import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';
import { act } from 'react-dom/test-utils';
import { fetchUserData } from '../services/fetchUserData/fetchUserData';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ secretToken: string }>) => {
            // при авторизации записать данные в стейт и в локал сторадж
            state.token = action.payload.secretToken;
            localStorage.setItem(USER_AUTHORIZATION_TOKEN, JSON.stringify(action.payload));
        },
        initAuthToken: (state) => {
            // проверить, авторизован ли пользователь (после закрытия и открытия приложения)
            const token = localStorage.getItem(USER_AUTHORIZATION_TOKEN);

            console.warn('init token from ls', token);

            if (token) {
                state.token = JSON.parse(token);
            }
            state._inited = true;
        },
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            // выход
            localStorage.removeItem(USER_AUTHORIZATION_TOKEN);
            state.token = undefined;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
