export const API_URL = "http://127.0.0.1:8000/api/medias";

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

export default Media;