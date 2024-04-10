import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { ConfigService } from "../../../services/config.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const language = req.query.language || 'en-US';
        const page = req.query.page || 1;
        const url = ConfigService.themoviedb.urls.peoples.popular + `?language=${language}&page=${page}`;
        const apiKey = ConfigService.themoviedb.keys.API_TOKEN;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + apiKey
            }
        };

        const apiResponse = await fetch(`${url}&api_key=${apiKey}`, options)
            .then(response => response.json())
            .catch(error => {
                throw new Error('Error fetching popular actors: ' + error);
            });

        if (!apiResponse) {
            res.status(404).json({ status: 404, error: "Not Found" });
            return;
        }

        res.status(200).json({ status: 200, data: apiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}
