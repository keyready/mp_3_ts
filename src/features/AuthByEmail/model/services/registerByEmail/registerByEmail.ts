import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const registerByEmail = createAsyncThunk<
    any,
    any,
    ThunkConfig<string>
>(
    'login/registerByEmail',
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post(
                '/sign_up',
                registerData,
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        flag: 'super-secret-flag-4toby-vse-dymali-4to-ya-trushHbIy-weber',
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
