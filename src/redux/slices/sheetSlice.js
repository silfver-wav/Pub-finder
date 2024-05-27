import { createSlice } from '@reduxjs/toolkit';

export const sheetSlice = createSlice({
    name: 'sheet',
    initialState: {
        makeReview: false,
    },
    reducers: {
        toggleSheet: (state) => {
            state.makeReview = !state.makeReview;
        },
    },
});

export const { toggleSheet } = sheetSlice.actions;

export default sheetSlice.reducer;
