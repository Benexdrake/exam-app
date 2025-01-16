import styles from '@/styles/QuizBlock.module.css'
import { Question } from '@/types/question'
import { useState } from 'react'

type QuizBlockProperty =
{
    q:Question;
    nr:number;
    changeIndexHandler:Function;
    setResults:Function;
}

export default function QuizBlock(props: QuizBlockProperty) 
{
    const { q, nr, changeIndexHandler } = props
    const [information, setInformation] = useState(false)
    
    
    const onCheckHandler = (e:any) => {
        if(e.target.innerText === 'Next')
        {
            setInformation(false)
            e.target.innerText = 'Check';
            changeIndexHandler();
            return;
        }
        
        e.target.innerText = 'Next';
        setInformation(true);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div>
                    <h3>Frage {nr}:</h3>
                    <p>{q.questions}</p>
                </div>
                <div>
                    <button type="button" className={styles.check_button} onClick={onCheckHandler}>Check</button>
                </div>
            </div>
            {q.answers.map((x: any, index:number) =>
            {   
                return (
                    <label key={index}>
                        <div className={styles.answer}><input type="checkbox"/>{x.answer}</div>
                    </label>
                )
            })}
                
            <div className={styles.information} style={{display:information?'block':'none'}}>
                <h3>Correct:</h3>
                <p dangerouslySetInnerHTML={{__html:q.explanation.correct}}></p>
                <br /><br /><br />
                <hr />
                <h3>Incorrect:</h3>
                <p dangerouslySetInnerHTML={{__html:q.explanation.incorrect}}></p>
                <br /><br /><br />
                <hr />
                <h3>Reference:</h3>
                <a href={q.explanation.reference} target='__blank'>Open Reference</a>
            </div>

        </div>
    )
}