import type { NextApiRequest, NextApiResponse } from "next";
import {Database} from 'sqlite3'


export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
    let db = new Database('exam.db')

    db.all('select * from thema', (err:any, result:any) => {
        if (result)
            res.status(200).json({'result': result})
        else if (err)
            res.status(200).json({'error': err.message})
    })
}