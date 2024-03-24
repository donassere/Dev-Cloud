import {NextApiRequest, NextApiResponse} from "next";
import {ConfigService} from "../../../services/config.service";
import fetch from "node-fetch";

// Swagger definition
/**
 * @swagger
 * /api/movies/search:
 *      get:
 *          description: Returns movies by search
 *          parameters:
 *              - in: query
 *                name: search
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Hello Movies
 */

export default async function handler(req:NextApiRequest, res:NextApiResponse ) {
    const search = req.query.search || '';
    const url = ConfigService.themoviedb.urls.movies.search + `?query=${search}&API_KEY=${ConfigService.themoviedb.keys.API_KEY}`;
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

    res.json({ status: 200, data: apiResponse });
}