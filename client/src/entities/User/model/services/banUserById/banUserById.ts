import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';

export const banUserById = createAsyncThunk<
    User,
    { userId: number, banReason: string },
    ThunkConfig<string>
>(
    'user/banUser',
    async ({ userId, banReason }, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            console.warn(banReason);
            const response = await extra.api.post<User>(
                `/ban/${userId}`,
                { banReason },
            );

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('update role error');
        }
    },
);
