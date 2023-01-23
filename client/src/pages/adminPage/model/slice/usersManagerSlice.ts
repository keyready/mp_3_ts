import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchUsers } from 'pages/adminPage/model/services/fetchUsers';
import { UsersManagerSchema } from 'pages/adminPage';
import { User } from 'entities/User';

const usersManagerAdapter = createEntityAdapter<User>({
    selectId: (user) => user.id,
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
                action: PayloadAction<User[]>,
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
