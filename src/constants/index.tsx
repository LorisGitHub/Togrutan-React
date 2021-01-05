export interface Media {
    title: string,
    year: number,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    directors: string,
    creators: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    image: string,
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
    viewed: string[],
    planToWatch:  string[],
    dropped:  string[],
}