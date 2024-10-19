import { Database } from "sqlite3"

export default function test(res:any)
{
    let db = new Database('public/exam.db')

    db.all('select * from thema', (err:any, result:any) => {
        if (result)
            res.status(200).json({'result': result})
        else if (err)
            res.status(200).json({'error': err.message})
    })
}