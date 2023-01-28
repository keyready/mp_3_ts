import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const changePassword = createAsyncThunk<
    any,
    { oldPassword: string, newPassword: string },
    ThunkConfig<string>
>(
    'profile/changePassword',
    async (changePassProps, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post(
                '/changePassword',
                changePassProps,
                {
                    headers: {
                        'Content-type': 'application/json',
                        flag: 'super-secret-flag-4toby-vse-dymali-4to-ya-trushHbIy-weber',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error creating award');
        }
    },
);
