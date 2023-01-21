import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';
import { responseSchema } from 'features/AuthByEmail/model/services/loginByEmail/loginByEmail';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<responseSchema>) => {
            // при авторизации записать данные в стейт и в локал сторадж
            state.token = action.payload.token;
            state.authData = action.payload.userData;
        },
        initAuthData: (state) => {
            // проверить, авторизован ли пользователь (после закрытия и открытия приложения)
            const token = localStorage.getItem(USER_AUTHORIZATION_TOKEN);
            if (token) {
                state.token = token;
            }
            state._inited = true;
        },
        logout: (state) => {
            // выход
            localStorage.removeItem(USER_AUTHORIZATION_TOKEN);
            state.token = undefined;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
