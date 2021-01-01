export const MEDIAS_URL = "http://127.0.0.1:8000/api/medias";
export const GET_MEDIA_BY_ID = "http://127.0.0.1:8000/api/getMediaFromImdbID";
export const GET_MULTIPLE_MEDIAS = "http://127.0.0.1:8000/api/getMultipleMediaFromImdbID";
export const USERS_URL = "http://127.0.0.1:8000/api/users";
export const SIGN_IN = "http://127.0.0.1:8000/api-token-auth/";
export const MEDIAS_PREVIEW_URL = "http://127.0.0.1:8000/api/medias_preview";

export interface Media {
    title: string,
    year: number,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    poster: string,
    metascore: number,
    imdbRating: number,
    imdbVotes: number,
    imdbID: string,
    type: string,
    dvd: string,
    boxOffice: string,
    production: string,
    website: string
}

export interface User {
    username: string,
    password: string,
    viewed: string,
    planToWatch: string,
    dropped: string,
}