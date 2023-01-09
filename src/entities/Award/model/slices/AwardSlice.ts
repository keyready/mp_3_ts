import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllAwards } from 'entities/Award/model/services/fetchAllAwards';
import { Award } from 'entities/Award/model/types/Award';
import { AwardSchema } from '../types/AwardSchema';

const initialState: AwardSchema = {
    data: [],
    isLoading: false,
    error: undefined,
};

export const AwardSlice = createSlice({
    name: 'AwardSlice',
    initialState,
    reducers: {
        setAwards: (state, action: PayloadAction<Award[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchAllAwards.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAllAwards.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllAwards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: AwardActions } = AwardSlice;
export const { reducer: AwardReducer } = AwardSlice;
