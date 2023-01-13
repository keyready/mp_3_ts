import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from 'entities/Hero';
import { fetchAllUsers } from 'entities/User';
import { UsersSchema } from '../types/UserSchema';

const initialState: UsersSchema = {
    data: [],
    error: undefined,
    isLoading: false,
};

export const UsersSlice = createSlice({
    name: 'UsersSlice',
    initialState,
    reducers: {
        setUsersData: (state, action: PayloadAction<Hero[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: UsersActions } = UsersSlice;
export const { reducer: UsersReducer } = UsersSlice;
