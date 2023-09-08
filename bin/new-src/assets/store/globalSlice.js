import { createSlice } from "@reduxjs/toolkit";

const initialState = {}


const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{}
})



export const globalActions = globalSlice.actions


export default globalSlice.reducer