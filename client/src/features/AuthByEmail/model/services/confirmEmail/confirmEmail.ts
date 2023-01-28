import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const confirmEmail = createAsyncThunk<
    any,
    string,
    ThunkConfig<string>
>(
    'login/confirmEmail',
    async (activateLink, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            // const response = await extra.api.post<responseType>('/sign_in', authData);
            const response = await extra.api.post(`/activate/${activateLink}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('activate email error');
        }
    },
);
