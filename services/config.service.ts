export const ConfigService = {
    themoviedb: {
        urls: {
            regex: {
                ninjaReplace: /\{.*?\}/g,
            },
            movies: {
                discover: "https://api.themoviedb.org/3/discover/movie",
                movie: "https://api.themoviedb.org/3/movie/{movie_id}?append_to_response=credits",
                popular: "https://api.themoviedb.org/3/movie/popular",
                top_rated: "https://api.themoviedb.org/3/movie/top_rated",
                upcoming: "https://api.themoviedb.org/3/movie/upcoming",
                videos: "https://api.themoviedb.org/3/movie/{movie_id}/videos",
                recommendations: "https://api.themoviedb.org/3/movie/{movie_id}/recommendations",
                search: "https://api.themoviedb.org/3/search/movie",
                images: "https://api.themoviedb.org/3/movie/{movie_id}/images",
                credits: "https://api.themoviedb.org/3/movie/{movie_id}/credits"
            },
            series : {
                discover: "https://api.themoviedb.org/3/discover/tv",
                serie: "https://api.themoviedb.org/3/tv",
                popular: "https://api.themoviedb.org/3/tv/popular",
                top_rated: "https://api.themoviedb.org/3/tv/top_rated",
            },
            peoples : {
                popular : "https://api.themoviedb.org/3/person/popular",
                person : "https://api.themoviedb.org/3/person/{person_id}"
            }
        },
        keys: {
            API_TOKEN: process.env.API_TOKEN,
            API_KEY: process.env.API_KEY
        }
    }
}