import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { USER_AUTHORIZATION_TOKEN, USER_LOCALSTORAGE_KEY } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from 'entities/Profile';

interface loginByEmailProps {
    email: string;
    password: string;
}

export interface responseType {
    secretToken: string;
    profile: Profile;
}

export const loginByEmail = createAsyncThunk<
    responseType,
    loginByEmailProps,
    ThunkConfig<string>
>(
    'login/loginByEmail',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<responseType>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            console.log(response.data);

            localStorage.setItem(
                USER_AUTHORIZATION_TOKEN,
                JSON.stringify(response.data.secretToken),
            );
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.profile));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
