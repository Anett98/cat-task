import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ICategory {
  randomizedCats: ICat[];
  loadMore: boolean;
  loading: boolean;
  error: null;
}

export const fetchImageByRandomImages = createAsyncThunk<
  ICat[],
  undefined,
  { rejectValue: string }
>("category/fetchImageByRandomImages", async (_, { rejectWithValue }) => {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&page=1"
  );

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }
  const data = await response.json();
  return data;
});

export const fetchloadMore = createAsyncThunk<
  ICat[],
  { page: number },
  { rejectValue: string }
>("load/fetchloadMore", async ({ page }, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`
  );

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }

  const data = await response.json();
  return data;
});

const initialState: ICategory = {
  randomizedCats: [],
  loadMore: false,
  loading: false,
  error: null,
};

const randomImagesmagesSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageByRandomImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImageByRandomImages.fulfilled, (state, action) => {
        state.loading = false;
        state.randomizedCats = action.payload;
      })
      .addCase(fetchloadMore.fulfilled, (state, action) => {
        state.randomizedCats = [...state.randomizedCats, ...action.payload];
      });
  },
});

export default randomImagesmagesSlice.reducer;
