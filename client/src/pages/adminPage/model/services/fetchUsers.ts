import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { User } from 'entities/User';

export interface fetchUsersProps {
}

export const fetchUsers = createAsyncThunk<
    User[],
    void,
    ThunkConfig<string>
>(
    'adminPage/fetchUsers',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<User[]>('/users');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error via fetching heroes');
        }
    },
);
