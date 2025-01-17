import Link from "next/link";

import style from '@/styles/navbar.module.css'

export default function Navbar()
{
    const themes = [
        ["#303841","#3A4750","#EA9215","#EEEEEE"],
        ["#000033","#0066CC","#0099FF","#EDEDED"],
        ["#FEF9E1","#E5D0AC","#A31D1D","#6D2323"],
        ["#1D1616","#8E1616","#D84040","#EEEEEE"]
    ]

    const changeColorHandler = (colors:string[]) =>
    {
        document.documentElement.style.setProperty('--color1',colors[0])
        document.documentElement.style.setProperty('--color2',colors[1])
        document.documentElement.style.setProperty('--color3',colors[2])
        document.documentElement.style.setProperty('--color4',colors[3])
    }

    return (
        <nav className={style.navbar_body}>
            <div className={style.navbar_links}>
                <ul>
                <Link href="/exam/1"> <li className={style.navbar_item}>AWS CCP EXAM</li> </Link>
                <Link href="/practice/1"> <li className={style.navbar_item}>AWS CCP PRACTICE</li> </Link>
                <Link href="/"> <li className={style.navbar_item}>HOME</li></Link>
                <Link href="/exam/2"> <li className={style.navbar_item}>AWS DVA EXAM</li> </Link>
                <Link href="/practice/2"> <li className={style.navbar_item}>AWS DVA PRACTICE</li> </Link>
                <li style={{display:"flex", alignItems:'center'}} id="themes">
                    {themes.map(x => {
                        return (
                            <div className={style.color_button} onClick={() => changeColorHandler(x)}>
                                <div style={{backgroundColor:`${x[0]}`, height:'15px'}}/>
                                <div style={{backgroundColor:`${x[1]}`, height:'15px'}}/>
                                <div style={{backgroundColor:`${x[2]}`, height:'15px'}}/>
                                <div style={{backgroundColor:`${x[3]}`, height:'15px'}}/>
                            </div>
                        )})}
                </li>
                </ul>
            </div>
    </nav>
    )
}