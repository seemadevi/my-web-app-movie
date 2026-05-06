import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLatestMovies,
  getUpcomingMovies,
  getEvents,
  getMovieDetails,
} from "../services/api";

export const fetchLatestMovies = createAsyncThunk(
  "movies/fetchLatestMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLatestMovies();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch latest movies");
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUpcomingMovies();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch upcoming movies");
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "movies/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEvents();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch events");
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getMovieDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch movie details");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    latestMovies: [],
    upcomingMovies: [],
    events: [],
    movieDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.latestMovies = action.payload;
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movieDetails = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default movieSlice.reducer;