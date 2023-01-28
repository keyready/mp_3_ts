import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAwardById } from '../services/fetchAwardById';
import { AwardSchema } from '../types/AwardSchema';

const initialState: AwardSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const AwardSlice = createSlice({
    name: 'AwardSlice',
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchAwardById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAwardById.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAwardById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: AwardActions } = AwardSlice;
export const { reducer: AwardReducer } = AwardSlice;
