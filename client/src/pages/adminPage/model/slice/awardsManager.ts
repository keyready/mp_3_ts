import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Award } from 'entities/Award';
import { AwardsManagerSchema } from 'pages/adminPage';
import { fetchAwards } from '../services/fetchAwards';

const awardsManagerAdapter = createEntityAdapter<Award>({
    selectId: (award) => award.id,
});

export const getAwards = awardsManagerAdapter.getSelectors<StateSchema>(
    (state) => state.awardsManagerPage || awardsManagerAdapter.getInitialState(),
);

const awardsManagerSlice = createSlice({
    name: 'awardsManagerSlice',
    initialState: awardsManagerAdapter.getInitialState<AwardsManagerSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchAwards.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAwards.fulfilled, (
                state,
                action: PayloadAction<Award[]>,
            ) => {
                state.isLoading = false;
                awardsManagerAdapter.setAll(state, action.payload);
            })
            .addCase(fetchAwards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const {
    reducer: awardsManagerReducers,
    actions: awardsManagerActions,
} = awardsManagerSlice;
