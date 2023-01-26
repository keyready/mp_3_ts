import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';

export const unBanUserById = createAsyncThunk<
    User,
    { id?: number },
    ThunkConfig<string>
>(
    'user/banUser',
    async (id, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                `/unban/${id}`,
            );

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('update role error');
        }
    },
);
