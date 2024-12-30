import axios from "axios";

export default function api() {
  const {
    public: { TMDB_API_URL, TMDB_ACCESS_TOKEN_AUTH },
  } = useRuntimeConfig();

  return axios.create({
    baseURL: TMDB_API_URL,
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN_AUTH}`,
    },
  });
}
