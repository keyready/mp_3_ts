import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface loginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<string, loginByEmailProps, ThunkConfig<string>>(
    'login/loginByEmail',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_AUTHORIZATION_TOKEN, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
