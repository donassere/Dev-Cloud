import {Movie} from "../../../types/movie";
import {NextApiRequest, NextApiResponse} from "next";
import {ConfigService} from "../../../services/config.service";
import clientPromise from "../../../lib/mongodb";

type ResponseData = {
    status: number,
    data?: { movie: Movie | string }
    method?: string,
    error?: string
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *         get: {
 *             description: 'Returns a movie by id',
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

// .../api/movies/:id
export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    const idMovie = parseInt(<string>req.query.idMovie, 10);
    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.movies.movie.replace(replaceRegex, idMovie.toString())
// 'https://api.themoviedb.org/3/movie'
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };
    const client = await clientPromise;
    const db = client.db("ynov-cloud-db");

    switch (req.method) {
        case "GET":
            const movie = await fetch(url, options)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));

            const likes = await db.collection("likes").findOne({idTMDB: idMovie});

            if (likes) {
                movie.likes = likes.likeCounter;
            } else {
                movie.likes = 0;
            }

            if (movie) {
                res.json({ status: 200, data: { movie: movie } });
            } else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
