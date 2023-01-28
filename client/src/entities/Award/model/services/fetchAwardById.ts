import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Award } from 'entities/Award/model/types/Award';

export const fetchAwardById = createAsyncThunk<
    Award,
    number,
    ThunkConfig<string>
>(
    'hero/fetchHeroData',
    async (awardId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<Award>(`/award/${awardId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error fetching hero data');
        }
    },
);
