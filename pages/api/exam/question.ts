import type { NextApiRequest, NextApiResponse } from "next";
import {Database} from 'sqlite3'


export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
    let db = new Database('public/exam.db')

    let id = req.query.id+""

    if(id.toLowerCase().includes('drop'))
        res.status(200).json('Nope')


    let query = `select * from question where thema_id = '${id}'`;

    db.all(query, (err:any, result:any) => {
        if (result)
            res.status(200).json({'result': result})
        else if (err)
            res.status(200).json({'error': err.message})
    })
}