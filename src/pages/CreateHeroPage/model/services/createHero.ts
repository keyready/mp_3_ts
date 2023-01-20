import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Hero } from 'entities/Hero';

export const createHero = createAsyncThunk<
    string,
    Hero,
    ThunkConfig<string>
>(
    'createHeroPage/createHero',
    async (newHero, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/heroes', newHero);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error creating hero');
        }
    },
);
