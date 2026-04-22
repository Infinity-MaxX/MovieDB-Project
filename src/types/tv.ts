export interface TV {
    id: number;
    adult: boolean;
    poster_path: string;
    overview: string;
    first_air_date: string; // differs from movie: release_date
    name: string; // differs from movie: title
    genres: number[];
    vote_average: number;
}

export interface TVTrailer {
    key: string;
    site: string;
    type: string;
}