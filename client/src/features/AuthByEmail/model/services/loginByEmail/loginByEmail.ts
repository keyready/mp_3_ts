import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_AUTHORIZATION_TOKEN } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from 'entities/Profile';

interface loginByEmailProps {
    email: string;
    password: string;
}

export interface responseType {
    secretToken: string;
    profile: Profile;
    message?: string;
}

export const loginByEmail = createAsyncThunk<
    { secretToken: string },
    loginByEmailProps,
    ThunkConfig<string>
>(
    'login/loginByEmail',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<{ secretToken: string }>('/sign_in', authData);

            if (!response.data) {
                throw new Error(response.statusText);
            }

            console.log(response.data.secretToken);

            localStorage.setItem(
                USER_AUTHORIZATION_TOKEN,
                JSON.stringify(response.data.secretToken),
            );

            // eslint-disable-next-line no-restricted-globals
            location.reload();

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
