import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Hero } from '../types/Hero';

export const fetchHeroData = createAsyncThunk<
    Hero,
    string,
    ThunkConfig<string>
>(
    'hero/fetchHeroData',
    async (heroId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Hero>(`/heroes/${heroId}`);

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
