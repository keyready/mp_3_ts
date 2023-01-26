import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export interface fetchUsersProps {
}

export const deleteAward = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>(
    'adminPage/deleteAward',
    async (heroId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post(`/deleteAward/${heroId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during deleting award');
        }
    },
);
