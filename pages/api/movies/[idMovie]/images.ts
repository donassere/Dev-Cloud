import { NextApiRequest, NextApiResponse } from "next";
import { ConfigService } from "../../../../services/config.service";
import { Image } from "../../../../types/movie";

/**
 * @swagger
 * /api/movies/{movieId}/images:
 *      get:
 *          description: Returns images for a movie by id
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

type ResponseData = {
    status: number,
    data?: { images: Image[] | string }
    method?: string,
    error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const idMovie = parseInt(req.query.idMovie as string, 10);
    if (!idMovie || isNaN(idMovie)) {
        res.status(400).json({ status: 400, error: "Invalid movie ID" });
        return;
    }

    const language = req.query.language || 'en-US';

    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.movies.images.replace(replaceRegex, idMovie.toString()) + `?language=${language}`;

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
                const images = await fetch(url, options).then(r => r.json());
                res.json({ status: 200, data: { images } });
                console.log(images);
                
            } catch (error) {
                console.error('Error fetching movie images:', error);
                res.status(500).json({ status: 500, error: "Internal Server Error" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
