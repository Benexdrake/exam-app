import styles from '@/styles/QuizBlock.module.css'
import { Answer, Question } from '@/types/question'
import { useState } from 'react'

type QuizBlockProperty =
{
    q:Question;
    nr:number;
    changeIndexHandler:Function;
    results:any
    setResults:Function;
}

export default function QuizBlock(props: QuizBlockProperty) 
{
    const { q, nr, changeIndexHandler, results, setResults } = props
    const [information, setInformation] = useState(false)
    
    
    const onCheckHandler = (e:any) => 
    {
        if(e.target.innerText === 'Next')
        {
            const inputs = getInputs();
            for(let i of inputs)
            {
                i.checked=false;
                let parent = i.parentElement;
                if(!parent) return;
                parent.style.borderColor = 'var(--color3)';
            }

            setInformation(false)
            e.target.innerText = 'Check';
            changeIndexHandler();

            return;
        }
        
        e.target.innerText = 'Next';

        setInformation(true);

        const inputs = getInputs();

        let won = false;
        
        
        for(let i = 0; i< q.answers.length; i++)
        {
            if(inputs[i].checked && q.answers[i].check)
            {
                won = true;
                let parent = inputs[i].parentElement;
                if(!parent) return;
                parent.style.borderColor = 'green';
            }
            else if(inputs[i].checked && !q.answers[i].check)
            {
                let parent = inputs[i].parentElement;
                if(!parent) return;
                parent.style.borderColor = 'red';
            }
            
        }

        if(!q.single_choice)
            for(let i = 0; i< q.answers.length; i++)
            {
                if(inputs[i].checked && !q.answers[i].check)
                {
                    won = false;
                    break;
                }
            }
            
        setResults([...results, {id:q.id, check:won}])
    }

    const getInputs = () => 
    {
        let inputs = []

        for(let i = 0; i< q.answers.length; i++)
        {
            const input = document.getElementById(i+"") as HTMLInputElement;
            inputs.push(input)
        }
        return inputs;
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div>
                    <h3>Frage {nr}:</h3>
                    <p>{q.questions}</p>
                </div>
                <div>
                    <button type="button" id='krasser_geiler_button' style={{display:'none'}} onClick={onCheckHandler}>Check</button>
                </div>
            </div>
            {q.single_choice ? 
            (<div>
                    {/* <form id='radio'></form> */}
                    {q.answers.map((x: Answer, index:number) =>
                        {   
                            return (
                                <label key={index} className={styles.answer}>
                                    <div><input type="radio" id={index+""} name='radio' value={x.check+''} /></div>
                                    <div >
                                    {x.answer}
                                    </div>
                                </label>
                            )
                        })}
                    </div>)
                        :
                        (<div>
                        {q.answers.map((x: Answer, index:number) =>
                            {   
                                return (
                                    <label key={index}>
                                        <div className={styles.answer}><input type="checkbox" id={index+""} value={x.check+''} />{x.answer}</div>
                                    </label>
                                )
                            })}
        
                        </div>)
            }
                
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