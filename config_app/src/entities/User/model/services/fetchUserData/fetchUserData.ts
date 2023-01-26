import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User, userActions } from 'entities/User';

export const fetchUserData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>(
    'user/fetchUserData',
    async (_, thunkAPI) => {
        const {
            extra, rejectWithValue, dispatch,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>(
                '/profile',
            );

            if (!response.data) {
                dispatch(userActions.logout());
            }

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('update role error');
        }
    },
);
