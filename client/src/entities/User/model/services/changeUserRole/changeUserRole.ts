import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';

interface newRoleProps {
    newRole: string
    id: number;
}
export const changeUserRole = createAsyncThunk<
    User,
    newRoleProps,
    ThunkConfig<string>
>(
    'user/changeUserRole',
    async (newRole, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                `/changeRole/${newRole.id}`,
                { newRole: newRole.newRole },
            );

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('update role error');
        }
    },
);
