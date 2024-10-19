import type { NextApiRequest, NextApiResponse } from "next";
import test from '@/lib/test'


export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
    test(res)
}