import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User/model/types/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface loginDataProps {
    email: string;
    password: string;
}
export const fetchAllUsers = createAsyncThunk<
    User[],
    void,
    ThunkConfig<string>
>(
    'user/fetchAllUsers',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await axios.get<User[]>('http://localhost:8000/users', {
                headers: {
                    authorization: 'super-secret-token',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            console.log('fetchAllUsers');

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error fetching users');
        }
    },
);
