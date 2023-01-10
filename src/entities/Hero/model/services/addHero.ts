import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Hero } from '../types/Hero';

export const addHero = createAsyncThunk<
    string,
    Hero,
    { rejectValue: string }
>(
    'hero/createNewHero',
    async (newHero, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await axios.post<Hero>(
                '/addHero',
                newHero,
                {
                    headers: {
                        authorization: 'super-secret-token',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return 'hero created';
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during fetching hero');
        }
    },
);
