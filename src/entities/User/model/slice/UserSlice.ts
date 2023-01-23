import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_AUTHORIZATION_TOKEN, USER_LOCALSTORAGE_KEY } from 'shared/const';
import { responseType } from 'features/AuthByEmail';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<responseType>) => {
            // при авторизации записать данные в стейт и в локал сторадж
            state.token = action.payload.secretToken;
            state.authData = action.payload.profile;
        },
        initAuthData: (state) => {
            // проверить, авторизован ли пользователь (после закрытия и открытия приложения)
            const token = localStorage.getItem(USER_AUTHORIZATION_TOKEN);
            const authData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            console.warn(JSON.parse(authData!));
            console.log('вроде бы аус дата');

            if (token && authData) {
                state.token = JSON.parse(token);
                state.authData = JSON.parse(authData);
            }
            state._inited = true;
        },
        logout: (state) => {
            // выход
            localStorage.removeItem(USER_AUTHORIZATION_TOKEN);
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.token = undefined;
            state.authData = undefined;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
