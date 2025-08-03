
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import { RootState } from '../StoreProvider';


export const fetchBlogs = createAsyncThunk('blogs/fetch', async (_, thunkAPI) => {
  try {
    const res = await API.get('/blogs/public');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch blogs');
  }
});


export const fetchOwnBlogs = createAsyncThunk('blogs/fetchOwn', async (_, thunkAPI) => {
  try {
    const res = await API.get('/blogs'); // Protected route
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch own blogs');
  }
});


export const createBlog = createAsyncThunk(
  'blogs/create',
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await API.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to create blog');
    }
  }
);


export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const res = await API.put(`/blogs/${id}`, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to update blog');
    }
  }
);


export const deleteBlog = createAsyncThunk('blogs/delete', async (id: string, thunkAPI) => {
  try {
    await API.delete(`/blogs/${id}`);
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to delete blog');
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [] as any[],
    userBlogs: [] as any[],
    loading: false,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchOwnBlogs.fulfilled, (state, action) => {
        state.userBlogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
        state.userBlogs.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
        state.userBlogs = state.userBlogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.userBlogs = state.userBlogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
