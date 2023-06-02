import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CategoriesList = {
  name: string;
  id: number;
};

type TList = {
  list: CategoriesList[];
  loading: boolean;
  error: string | null;
};

export const fetchCategoriesList = createAsyncThunk<
  CategoriesList[],
  undefined,
  { rejectValue: string }
>("list/fetchCategoriesList", async function (_, { rejectWithValue }) {
  const response = await fetch(`https://api.thecatapi.com/v1/categories `);

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }

  const data = await response.json();

  return data as CategoriesList[];
});

const initialState: TList = {
  list: [],
  loading: false,
  error: null,
};

const categoriesListSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default categoriesListSlice.reducer;
