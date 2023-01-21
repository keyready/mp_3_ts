import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

export const createHero = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>
>(
    'createHeroPage/createHero',
    async (newHero, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const dispatch = useAppDispatch();
        const userId = useSelector(getUserAuthData);
        console.warn(userId);

        try {
            const response = await extra.api.post<string>('/heroes', newHero);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error creating hero');
        }
    },
);
