import { configureStore } from '@reduxjs/toolkit'
import mostPopulerNewssSlice from './slices/mostPopulerNewssSlice';

const store = configureStore({
    reducer: {
        populernewsSlice: mostPopulerNewssSlice,
    }
})

export default store;