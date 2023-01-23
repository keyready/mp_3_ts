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
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                '/create',
                registerData,
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
