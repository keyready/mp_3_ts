import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Award } from 'entities/Award';

export const fetchAwards = createAsyncThunk<
    Award[],
    void,
    ThunkConfig<string>
>(
    'adminPage/fetchAwards',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Award[]>('/awards');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error via fetching awards');
        }
    },
);
