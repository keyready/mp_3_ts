/**
 *   Новый тип комментов, хыы
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangePassSchema } from 'pages/ProfilePage';
import { changePassword } from 'pages/ProfilePage/model/service/changePassword';

const initialState: ChangePassSchema = {
    data: {},
    error: undefined,
    isLoading: false,
};

export const changePasswordSlice = createSlice({
    name: 'changePasswordSlice',
    initialState,
    reducers: {
        setOldPassword: (state, action:PayloadAction<string>) => {
            state.data.oldPassword = action.payload;
        },
        setNewPassword: (state, action:PayloadAction<string>) => {
            state.data.newPassword = action.payload;
        },
        setRepeatedNewPassword: (state, action:PayloadAction<string>) => {
            state.data.repeatedNewPassword = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: changePasswordActions } = changePasswordSlice;
export const { reducer: changePasswordReducer } = changePasswordSlice;
