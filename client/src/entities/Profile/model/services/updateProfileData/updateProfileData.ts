import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
    >(
        'profile/updateProfileData',
        async (_, thunkAPI) => {
            const { extra, rejectWithValue, getState } = thunkAPI;

            const formData = getProfileForm(getState());

            try {
                const response = await extra.api.put<User>(
                    '/profile',
                    formData,
                );

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('updating profile error');
            }
        },
    );
