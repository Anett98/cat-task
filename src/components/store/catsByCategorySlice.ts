import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ICategory {
  category: ICat[];
  loadMore: boolean;
  loading: boolean;
  error: null;
}

export const fetchImageByCategory = createAsyncThunk<
  ICat[],
  string,
  { rejectValue: string }
>("category/fetchImageByCategory", async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${id}`
  );

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }

  const data = await response.json();
  return data;
});

export const fetchloadMore = createAsyncThunk<
  ICat[],
  { id: string; page: number },
  { rejectValue: string }
>("load/fetchloadMore", async ({ id, page }, { rejectWithValue }) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${id}`
  );

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }

  const data = await response.json();
  return data;
});

const initialState: ICategory = {
  category: [],
  loadMore: false,
  loading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImageByCategory.pending, (state)=>{
      state.loading = true;
      state.error = null;
  })
  .addCase(fetchImageByCategory.fulfilled,(state,action)=>{
      state.loading = false;
          state.category = action.payload
  })
  .addCase(fetchloadMore.fulfilled, (state,action)=>{
      state.category = [...state.category,...action.payload]
  }) 
  },
});

export default imagesSlice.reducer;
