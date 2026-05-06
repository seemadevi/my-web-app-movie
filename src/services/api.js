import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getLatestMovies = () => api.get("/latest");
export const getUpcomingMovies = () => api.get("/upcomingMovies");
export const getEvents = () => api.get("/events");

// Fetch from both endpoints and find by id - clean, no console 404s
export const getMovieDetails = async (id) => {
  const [latestRes, upcomingRes] = await Promise.all([
    api.get("/latest"),
    api.get("/upcomingMovies"),
  ]);

  const numId = Number(id);
  const movie = [...latestRes.data, ...upcomingRes.data].find(
    (m) => Number(m.id) === numId
  );

  if (!movie) {
    const err = new Error("Movie not found");
    err.response = { status: 404 };
    throw err;
  }
  return { data: movie };
};

export default api;
