import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Award } from '../types/Award';

export const fetchAwardById = createAsyncThunk<
    Award,
    number,
    {rejectValue: string}
>(
    'awards/getOneById',
    async (awardId, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/awards/${awardId}`, {
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
            return thunkAPI.rejectWithValue('get awards error');
        }
    },
);
