import {NextApiRequest, NextApiResponse} from "next";
import {ConfigService} from "../../../../services/config.service";
import fetch from "node-fetch";

/**
 * @swagger
 * /api/movies/{idMovie}/videos:
 *         get: {
 *             description: 'Returns videos related to a movie by id',
 *             parameters: [
 *                 {
 *                     in: 'path',
 *                     name: 'idMovie',
 *                     required: true,
 *                     schema: {
 *                         type: 'integer',
 *                         minimum: 1
 *                     }
 *                 }
 *             ],
 *             responses: {
 *                 200: {
 *                     description: 'Hello Movies'
 *                 }
 *             }
 *         }
 */

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.movies.videos.replace(replaceRegex, <string>req.query.idMovie)
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