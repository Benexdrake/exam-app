import type { NextApiRequest, NextApiResponse } from "next";
import aws_ccp from './aws_questions.json'
import aws_dva from './aws_dva_questions.json'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) 
{
    
    const id = req.query.id as string;

    switch(id)
    {
        case '1':
            res.status(200).json(aws_ccp);
            break;
        case '2':
            res.status(200).json(aws_dva);
            break;
        default:
            res.status(200).json([])
    }
}