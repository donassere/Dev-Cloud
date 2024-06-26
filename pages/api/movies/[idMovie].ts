import { Movie } from "../../../types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { ConfigService } from "../../../services/config.service";
import fetch from 'node-fetch';

type ResponseData = {
    status: number,
    data?: { movie: Movie | string }
    method?: string,
    error?: string
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     description: Returns a movie by id
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Hello Movies
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const idMovie = parseInt(req.query.idMovie as string, 10);
    if (!idMovie || isNaN(idMovie)) {
        res.status(400).json({ status: 400, error: "Invalid movie ID" });
        return;
    }

    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.movies.movie.replace(replaceRegex, idMovie.toString())

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    switch (req.method) {
        case "GET":
            try {
                const movie = await fetch(url, options).then(r => r.json());
                res.json({ status: 200, data: { movie } });
            } catch (error) {
                console.error('Error fetching movie:', error);
                res.status(500).json({ status: 500, error: "Internal Server Error" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
