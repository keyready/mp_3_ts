import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Hero } from 'entities/Hero/model/types/Hero';
import { HeroActions } from 'entities/Hero/model/slices/HeroSlice';

export const getAllHeroes = createAsyncThunk<Hero[], void, {rejectValue: string}>(
    'heroes/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8000/heroes', {
                headers: {
                    authorization: 'super-secret-token',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(HeroActions.setHeroes(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('get heroes error');
        }
    },
);
