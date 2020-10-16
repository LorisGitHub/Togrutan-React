export const MEDIAS_URL = "http://127.0.0.1:8000/api/medias";
export const USERS_URL = "http://127.0.0.1:8000/api/users";
export const MEDIAS_PREVIEW_URL = "http://127.0.0.1:8000/api/medias_preview";
export const MEDIA_BY_ID = "http://127.0.0.1:8000/api/getMediaFromImdbID";

export interface Media {
    "Title": string,
    "Year": number,
    "Rated": string,
    "Released": string,
    "Runtime": string,
    "Genre": string,
    "Director": string,
    "Writer": string,
    "Actors": string,
    "Plot": string,
    "Language": string,
    "Country": string,
    "Awards": string,
    "Poster": string,
    "Metascore": number,
    "imdbRating": number,
    "imdbVotes": number,
    "imdbID": string,
    "Type": string,
    "DVD": string,
    "BoxOffice": string,
    "Production": string,
    "Website": string
}

export interface User {
    "Username": string,
    "Password": string,
    "Viewed": string,
    "PlanToWatch": string,
    "Dropped": string,
}