import {combineSlices, configureStore} from "@reduxjs/toolkit"
import { productSlice } from "./product"
import { useSelector as hookSelector, useDispatch as hookDispatch } from "react-redux"

const rootReducer = combineSlices(productSlice)

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export const useDispatch = hookDispatch.withTypes<AppDispatch>()
export const useSelector = hookSelector.withTypes<RootState>()

