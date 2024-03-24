export const ConfigService = {
    themoviedb: {
        urls: {
            regex: {
                ninjaReplace: /\{.*?\}/g,
            },
            movies: {
                discover: "https://api.themoviedb.org/3/discover/movie",
                movie: "https://api.themoviedb.org/3/movie/{movie_id}",
                popular: "https://api.themoviedb.org/3/movie/popular",
                top_rated: "https://api.themoviedb.org/3/movie/top_rated",
                videos: "https://api.themoviedb.org/3/movie/{movie_id}/videos",
                recommendations: "https://api.themoviedb.org/3/movie/{movie_id}/recommendations",
                search: "https://api.themoviedb.org/3/search/movie",
                image: "https://api.themoviedb.org/3/movie/{movie_id}/images",
                credits: "https://api.themoviedb.org/3/movie/{movie_id}/credits"
            },
            series : {
                discover: "https://api.themoviedb.org/3/discover/tv",
                serie: "https://api.themoviedb.org/3/tv",
                popular: "https://api.themoviedb.org/3/tv/popular",
                top_rated: "https://api.themoviedb.org/3/tv/top_rated",
            }
        },
        keys: {
            API_TOKEN: process.env.API_TOKEN,
            API_KEY: process.env.API_KEY
        }
    }
}