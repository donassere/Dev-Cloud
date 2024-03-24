import {Movie} from "../../types/movie";
import {NextApiRequest, NextApiResponse} from "next";
import {ConfigService} from "../../services/config.service";
import fetch from "node-fetch";

type ResponseData = {
    status: number,
    data?: { page:number, results: Movie[], total_pages:number, total_results:number },
    method?: string,
    error?: string
}

// Swagger definition
/**
 * @swagger
 * /api/movies:
 *      get:
 *          description: Returns popular movies
 *          parameters:
 *              - in: query
 *                name: language
 *                required: false
 *                schema:
 *                  type: string
 *                  default: 'en-US'
 *              - in: query
 *                name: page
 *                required: false
 *                schema:
 *                  type: integer
 *                  default: 1
 *          responses:
 *              200:
 *                  description: Hello Movies
 */

// .../api/movies
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // Fetch the movies from the TheMovieDB API
    const language = req.query.language || 'en-US';
    const page = req.query.page || 1;
    const url = ConfigService.themoviedb.urls.movies.popular + `?language=${language}&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    switch (req.method) {
        case "POST":
            // Here the logic for POST case
            break;

        case "GET":
            const apiResponse = await fetch(url, options)
                .then(r => r.json())
                .catch(err => res.json({status: 500, error: "Internal Server Error"}));

            if (!apiResponse) {
                res.json({status: 404, error: "Not Found"})
                return
            }

            res.json({status: 200, data: apiResponse, method: "GET"})
            break;

        default:
            res.json({status: 405, error: "Method Not Allowed"})
            break;
    }
}