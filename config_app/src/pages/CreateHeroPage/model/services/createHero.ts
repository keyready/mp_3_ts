import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const createHero = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>
>(
    'createHeroPage/createHero',
    async (newHero, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post(
                '/create',
                newHero,
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        flag: 'super-secret-flag-4toby-vse-dymali-4to-ya-trushHbIy-weber',
                    },
                },
            );

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
