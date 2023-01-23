import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { fetchUsers } from 'pages/adminPage/model/services/fetchUsers';
import { UsersManagerSchema } from 'pages/adminPage';

const usersManagerAdapter = createEntityAdapter<Profile>({
    selectId: (hero) => hero.id,
});

export const getUsers = usersManagerAdapter.getSelectors<StateSchema>(
    (state) => state.usersManagerPage || usersManagerAdapter.getInitialState(),
);

const usersManagerSlice = createSlice({
    name: 'adminPageSlice',
    initialState: usersManagerAdapter.getInitialState<UsersManagerSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (
                state,
                action: PayloadAction<Profile[]>,
            ) => {
                state.isLoading = false;
                usersManagerAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const {
    reducer: usersManagerReducers,
    actions: usersManagerActions,
} = usersManagerSlice;
