import { NextApiRequest, NextApiResponse } from "next";
import { ConfigService } from "../../../../services/config.service";

/**
 * @swagger
 * /api/movies/{movieId}/credits:
 *      get:
 *          description: Returns credits for a movie by id
 *          parameters:
 *              - in: path
 *                name: movieId
 *                required: true
 *                schema:
 *                  type: integer
 *                  minimum: 1
 *              - in: query
 *                name: language
 *                required: false
 *                schema:
 *                  type: string
 *                  default: 'en-US'
 *          responses:
 *              200:
 *                  description: Hello Movies
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const movieId = req.query.movieId as string;
    const language = req.query.language || 'en-US';

    const url = ConfigService.themoviedb.urls.movies.credits.replace('{movie_id}', movieId) + `?language=${language}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    try {
        const apiResponse = await fetch(url, options);
        const data = await apiResponse.json();
        res.status(200).json({ status: 200, data });
    } catch (error) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}
