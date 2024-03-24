import {NextApiRequest, NextApiResponse} from "next";
import {ConfigService} from "../../../../services/config.service";

// Swagger definition for /api/movies/{movieId}/recommendations
/**
 * @swagger
 * /api/movies/{idMovie}/recommandation:
 *      get:
 *          description: Returns recommended movies for a movie by id
 *          parameters:
 *              - in: path
 *                name: idMovie
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

export default async function handler(req:NextApiRequest, res:NextApiResponse ) {
    const idMovie = <string>req.query.idMovie;
    const language = req.query.language || 'en-US';
    const page = req.query.page || 1;
    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.movies.recommendations.replace(replaceRegex, idMovie) + `?language=${language}&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    const apiResponse = await fetch(url, options)
        .then(r => r.json())
        .catch(err => res.json({status: 500, error: "Internal Server Error"}));

    if (!apiResponse) {
        res.json({status: 404, error: "Not Found"})
        return
    }

    res.json({ status: 200, data: apiResponse.results });
}