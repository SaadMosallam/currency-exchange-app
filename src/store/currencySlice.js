import { fetchResult } from "@/API/currencyAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getResult = createAsyncThunk(
  "currency/fetchResult",
  async (args, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(setError(null));
    try {
      const response = await fetchResult(args);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  value: {
    from: null,
    to: null,
  },
  amount: "1.0",
  formattedAmount: "1.0",
  result: null,
  isDropdownOpen: null,
  error: null,
  currenciesList: [],
  isLoading: null,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrenciesList: (state, action) => {
      state.currenciesList = action.payload;
    },
    setIsDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    selectCurrency: (state, action) => {
      const { payload } = action;
      state.result = null;
      state.value[payload.id] = payload.value;
    },
    setAmount: (state, action) => {
      state.result = null;
      state.amount = action.payload;
    },
    setFormattedAmount: (state, action) => {
      state.formattedAmount = action.payload;
    },
    swapCurrencies: (state) => {
      const { from, to } = state.value;
      state.result = null;
      state.value = {
        from: to,
        to: from,
      };
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reset: (state) => ({
      ...initialState,
      currenciesList: state.currenciesList,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getResult.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getResult.fulfilled, (state, action) => {
      state.isLoading = null;
      state.result = action.payload;
    });
    builder.addCase(getResult.rejected, (state, action) => {
      state.isLoading = null;
      state.error = true;
    });
  },
});

export const {
  selectCurrency,
  setAmount,
  swapCurrencies,
  setError,
  reset,
  setResult,
  setCurrenciesList,
  setIsDropdownOpen,
  setFormattedAmount,
} = currencySlice.actions;

export default currencySlice.reducer;
