import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    populerNews: []
};

const populerNewsSlice = createSlice({
    name: 'populerNews',
    initialState,
    reducers: {
        getPopulerNews: (state, action) => {
            state.populerNews = action.payload;
        }
    }
});

export const { getPopulerNews } = populerNewsSlice.actions
export default populerNewsSlice.reducer;