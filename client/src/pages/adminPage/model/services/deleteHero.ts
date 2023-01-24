import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export interface fetchUsersProps {
}

export const deleteHero = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>(
    'adminPage/deleteHero',
    async (heroId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post(`/deleteHero/${heroId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during deleting hero');
        }
    },
);
