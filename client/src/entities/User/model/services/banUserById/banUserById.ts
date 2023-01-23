import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';

export const banUserById = createAsyncThunk<
    User,
    number,
    ThunkConfig<string>
>(
    'user/banUser',
    async (id, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                `/ban/${id}`,
            );

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('update role error');
        }
    },
);
