import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Hero } from 'entities/Hero';

export const fetchHeroes = createAsyncThunk<
    Hero[],
    void,
    ThunkConfig<string>
>(
    'adminPage/fetchHero',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Hero[]>('/heroes');

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
