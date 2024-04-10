import { NextApiRequest, NextApiResponse } from "next";
import { Actor } from "../../../types/actors";
import { ConfigService } from "../../../services/config.service";
import fetch from 'node-fetch';

type ResponseData = {
    status: number,
    data?: { actor: Actor | string }
    error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const idActor = parseInt(req.query.idActor as string, 10);
    if (!idActor || isNaN(idActor)) {
        res.status(400).json({ status: 400, error: "Invalid actor ID" });
        return;
    }

    const replaceRegex = new RegExp(ConfigService.themoviedb.urls.regex.ninjaReplace)
    const url = ConfigService.themoviedb.urls.peoples.person.replace(replaceRegex, idActor.toString())

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
                const actor = await fetch(url, options).then(r => r.json());
                res.json({ status: 200, data: { actor } });
            } catch (error) {
                console.error('Error fetching actor:', error);
                res.status(500).json({ status: 500, error: "Internal Server Error" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
