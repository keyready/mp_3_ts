import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHeroData } from 'entities/Hero/model/services/fetchHeroData';
import { HeroSchema } from 'entities/Hero';
import { createHero } from '../services/createHero';

const initialState: HeroSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const CreateHeroPageSlice = createSlice({
    name: 'CreateHeroPageSlice',
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
            })

            .addCase(createHero.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createHero.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createHero.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: createHeroPageActions } = CreateHeroPageSlice;
export const { reducer: createHeroPageReducers } = CreateHeroPageSlice;
