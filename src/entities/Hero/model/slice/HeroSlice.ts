import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHeroData } from 'entities/Hero/model/services/fetchHeroData';
import { HeroSchema } from '../types/HeroSchema';

const initialState: HeroSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const HeroSlice = createSlice({
    name: 'HeroSlice',
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchHeroData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchHeroData.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchHeroData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: HeroActions } = HeroSlice;
export const { reducer: HeroReducer } = HeroSlice;
