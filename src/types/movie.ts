export interface Movie {
    id: number;
    adult: boolean;
    poster_path: string;
    overview: string;
    release_date: string; // differs from tv: first_air_date
    title: string; // differs from tv: name
    genres: number[];
    vote_average: number;
}

// for more complex implementation, this would be
// ideal to keep; however, for this project, 
// MovieResponse is implicitly used through the
// Movie interface above with its release_date,
// poster_path, overview and vote_average
// export interface MovieResponse {
//     adult: boolean;
//     backdrop_path: string;  
//     genre_ids: number[];
//     id: number;
//     original_language: string;
//     original_title: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     release_date: string;
//     title: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
// }

// export interface MovieResults {
//     page: number;
//     results: MovieResponse[];
//     total_pages: number;
//     total_results: number;
// }

export interface MovieTrailer {
    key: string;
    site: string;
    type: string;
}