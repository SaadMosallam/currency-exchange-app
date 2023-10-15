import { fetchResult } from '@/API/currencyAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getResult = createAsyncThunk('currency/fetchResult', async (args) => {
    const response = await fetchResult(args);
    console.log('response', response)
    return response
})

const initialState = {
    value: {
        from: null,
        to: null,
    },
    result: null,
    isDropdownOpen: null,
    error: null,
    currenciesList: [],
    isLoading: null,
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
    extraReducers: builder => {
        builder.addCase(getResult.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getResult.fulfilled, (state, action) => {
            state.isLoading = null;
            state.result = action.payload;
        })
        builder.addCase(getResult.rejected, (state, action) => {
            state.isLoading = null
            state.error = true;
        })
    }
})

export const { openDropDown, closeDropDown, selectCurrency, swapCurrencies, setError, reset, setResult, setCurrenciesList } = currencySlice.actions

export default currencySlice.reducer