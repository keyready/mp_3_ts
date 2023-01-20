import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHeroData } from 'entities/Hero/model/services/fetchHeroData';
import { HeroSchema } from 'entities/Hero';

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
            });
    }),
});

export const { actions: CreateHeroPageSliceActions } = CreateHeroPageSlice;
export const { reducer: CreateHeroPageReducer } = CreateHeroPageSlice;
