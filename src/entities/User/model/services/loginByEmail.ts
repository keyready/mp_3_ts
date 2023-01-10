import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User/model/types/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/config/const';
import { UserActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface loginDataProps {
    email: string;
    password: string;
}
export const loginByEmail = createAsyncThunk<
    User,
    loginDataProps,
    ThunkConfig<string>
>(
    'user/loginByEmail',
    async (userData, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await axios.post<User>('http://localhost:8000/sign_in', userData);

            if (!response.data) {
                throw new Error();
            }

            console.log('login');

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(UserActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error during login');
        }
    },
);
