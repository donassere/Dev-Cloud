import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { ConfigService } from "../../../services/config.service";
import { Actors } from "../../../types/actors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const language = req.query.language || 'en-US';
        let page: any = req.query.page || 1;
        const apiKey = ConfigService.themoviedb.keys.API_TOKEN;
        let actorsPerPage = 50;
        let allActors: Actors[] = [];

        let startIndex = (page - 1) * actorsPerPage;

        const url = ConfigService.themoviedb.urls.peoples.popular + `?language=${language}&page=${page}`;
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

        if (!apiResponse.results || apiResponse.results.length === 0) {
            res.status(404).json({ status: 404, error: "No results found" });
            return;
        }

        allActors = apiResponse.results.slice(startIndex, startIndex + actorsPerPage);

        res.status(200).json({ status: 200, data: allActors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}
