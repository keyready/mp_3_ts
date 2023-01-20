import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Hero } from 'entities/Hero/model/types/Hero';

export interface fetchHeroesProps {
}

export const fetchHeroes = createAsyncThunk<
    Hero[],
    fetchHeroesProps,
    ThunkConfig<string>
>(
    'heroes/fetchHeroes',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Hero[]>('/heroes', {
                params: {
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
