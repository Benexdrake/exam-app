import Link from "next/link";

import style from '@/styles/navbar.module.css'

export default function Navbar()
{
    return (
        <nav className={style.navbar_body}>
            <div className={style.navbar_links}>
                <ul>
                <Link href="/exam/1"> <li className={style.navbar_item}>AWS CCP EXAM</li> </Link>
                <Link href="/practice/1"> <li className={style.navbar_item}>AWS CCP PRACTICE</li> </Link>
                <Link href="/"> <li className={style.navbar_item}>HOME</li> </Link>
                <Link href="/exam/2"> <li className={style.navbar_item}>AWS DVA EXAM</li> </Link>
                <Link href="/practice/2"> <li className={style.navbar_item}>AWS DVA PRACTICE</li> </Link>
                </ul>
            </div>
    </nav>
    )
}