import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) 
{
    res.status(200).json([{id:1, exam:'AWS CCP'}, {id:2, exam:'AWS DVA'}])
}