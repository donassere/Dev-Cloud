
import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../../../lib/mongodb";

// Swagger definition
/**
 * @swagger
 * /api/movies/{idMovie}/unlike:
 *   patch:
 *     description: Decrement the likes of a movie by id
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

// pages/api/movies/[idMovie]/likes.js
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const idMovie = parseInt(<string>req.query.idMovie, 10);
    const client = await clientPromise;
    const db = client.db("ynov-cloud-db");
    switch (req.method) {
        case "PATCH":
            const like = await db.collection("likes").findOne({idTMDB: idMovie});
            let resMongo, data;
            if (like) {
                resMongo = await db.collection("likes").updateOne(
                    {idTMDB: idMovie},
                    { $inc: { likeCounter : like.likeCounter > 0 ? -1 : 0 } }
                )
                data = {
                    action: 'likeCounter incremented',
                    idMovie: idMovie,
                    matchedCount: resMongo.matchedCount,
                    modifiedCount: resMongo.modifiedCount
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, likeCounter: 0}
                )
                data = {
                    action: 'likeCounter created',
                    idMovie: idMovie,
                    insertedId: resMongo.insertedId
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
