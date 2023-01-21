import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { USER_LOCALSTORAGE_KEY } from 'shared/const';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from 'entities/Profile';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
        'profile/fetchProfileData',
        async (profileId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;
            // const dispatch = useAppDispatch();

            try {
                const response = await extra.api.get<Profile>(`/profiles/${profileId}`);

                if (!response.data) {
                    throw new Error();
                }

                // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
                // dispatch(profileActions.setProfileData(response.data));

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
