import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface RegisterByEmailProps {
    email: string;
    password: string;
}

export const registerByEmail = createAsyncThunk<
    User,
    any,
    ThunkConfig<string>
>(
    'login/registerByEmail',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                'http://localhost:9999/create',
                {
                    // const response = await extra.api.post<User>('/sign_up', {
                    ...authData,
                    role: 'user',
                },
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('register error');
        }
    },
);
