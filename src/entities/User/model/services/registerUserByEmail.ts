import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User/model/types/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/config/const';
import { UserActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface registerDataProps {
    firstname: string;
    middlename: string;
    lastname: string;
    photo: string;
    email: string;
    password: string;
}
export const registerUserByEmail = createAsyncThunk<
    string,
    registerDataProps,
    ThunkConfig<string>
>(
    'user/registerUserByEmail',
    async (userData, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            // http://localhost:8000
            const response = await axios.post<string>(
                'http://localhost:8000/sign_up',
                userData,
                {
                    headers: {
                        authorization: 'super-secret-token',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            console.log('регистрация успешна');
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during register');
        }
    },
);
