import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AwardActions } from 'entities/Award/model/slices/AwardSlice';
import { Award } from '../types/Award';

export const fetchAllAwards = createAsyncThunk<Award[], void, {rejectValue: string}>(
    'awards/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8000/awards', {
                headers: {
                    authorization: 'super-secret-token',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(AwardActions.setAwards(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('get awards error');
        }
    },
);
