import {NextApiRequest, NextApiResponse} from "next";

// Swagger definition
/**
 * @swagger
 * /api/authent:
 *   get:
 *     description: Get a message
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             method:
 *               type: string
 *   post:
 *     description: Post a message
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             method:
 *               type: string
 */


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case 'GET':
            res.status(200).json({ name: 'Hello Authent', method: 'GET'});
            break;

        case 'POST':
            res.status(200).json({ name: 'Hello Authent', method: 'POST'});
            break;

        default:
            res.status(405).end();
    }
}