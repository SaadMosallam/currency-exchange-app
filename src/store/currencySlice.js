import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        from: null,
        to: null,
    },
    result: null,
    isDropdownOpen: null,
    error: null,
    currenciesList: [],
}


export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrenciesList: (state, action) => {
            state.currenciesList = action.payload;
        },
        openDropDown: (state, action) => {
            state.isDropdownOpen = action.payload
        },
        closeDropDown: (state) => {
            state.isDropdownOpen = null
        },
        selectCurrency: (state, action) => {
            const { payload } = action;
            state.result = null;
            state.value[payload.id] = payload.value;
        },
        swapCurrencies: (state) => {
            const { from, to } = state.value;
            state.value = {
                from: to,
                to: from,
            }
            state.result = null;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        reset: (state) => ({ ...initialState, currenciesList: state.currenciesList })
    },
})

// Action creators are generated for each case reducer function
export const { openDropDown, closeDropDown, selectCurrency, swapCurrencies, setError, reset, setResult, setCurrenciesList } = currencySlice.actions

export default currencySlice.reducer