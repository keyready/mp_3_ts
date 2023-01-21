import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { USER_LOCALSTORAGE_KEY } from 'shared/const';

export const createHero = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>
>(
    'createHeroPage/createHero',
    async (newHero, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        // const dispatch = useDispatch();

        try {
            const { id } = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY)!);

            const heroData = { ...newHero, userId: id };
            const response = await extra.api.post<string>('/heroes', heroData);

            if (!response.data) {
                throw new Error();
            }

            // dispatch(heroesPageActions.modify());
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error creating hero');
        }
    },
);
