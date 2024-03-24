import fetch from "node-fetch";
import {ConfigService} from "../../services/config.service";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse ) {
    const url = ConfigService.themoviedb.urls.movies.discover;

    //https://api.themoviedb.org/3/discover/movie
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    const apiResponse = await fetch(url, options)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));

    res.json({ status: 200, data: apiResponse.results });
}
