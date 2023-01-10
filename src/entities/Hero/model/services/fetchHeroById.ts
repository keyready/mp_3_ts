import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Hero } from '../types/Hero';

export const fetchHeroById = createAsyncThunk<
    Hero,
    number,
    { rejectValue: string }
>(
    'hero/fetchHeroById',
    async (heroId, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await axios.get<Hero>(`/heroes/${heroId}`, {
                headers: {
                    authorization: 'super-secret-token',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during fetching hero');
        }
    },
);
