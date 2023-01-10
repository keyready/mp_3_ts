import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Hero } from '../types/Hero';

export const fetchAllHeroes = createAsyncThunk<
    Hero[],
    void,
    { rejectValue: string }
>(
    'heroes/fetchAllHeroes',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await axios.get<Hero[]>('/heroes', {
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
            return rejectWithValue('error during fetching heroes');
        }
    },
);
