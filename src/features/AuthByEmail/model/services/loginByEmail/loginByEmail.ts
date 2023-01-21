import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { USER_AUTHORIZATION_TOKEN, USER_LOCALSTORAGE_KEY } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface loginByEmailProps {
    email: string;
    password: string;
}

export interface responseSchema {
    token: string;
    userData: any
}

export const loginByEmail = createAsyncThunk<
    responseSchema,
    loginByEmailProps,
    ThunkConfig<string>
>(
    'login/loginByEmail',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<responseSchema>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            console.log(response.data);
            localStorage.setItem(USER_AUTHORIZATION_TOKEN, response.data.token);
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.userData));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
