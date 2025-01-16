import styles from '@/styles/QuizResult.module.css'
import { Answer, Question } from '@/types/question';
import { Result } from '@/types/result';

export type QuizResultType =
{
    questions:Question[];
    results: Result[];
}

export default function QuizResult(props:QuizResultType)
{
    const {questions, results} = props;

    const wrongsQuestions = () =>
    {
        let wrongs:Question[] = []

        for(let result of results)
        {
            const wrong = questions.find(x => x.id === result.id)
            
            if(!wrong) continue;

            wrongs.push(wrong)
        }
        return wrongs;
    }

    const filterAnswers = (answers:Answer[], check:boolean) =>
    {
        return answers.filter(x => x.check === check)
    }


    return (
        <div className={styles.result}>
            <h1>{`${results.length}/${questions.length}`}</h1>
            {wrongsQuestions().map(x => {
                return (
                    <div key={`result-${x.id}`} className={styles.result_block}>
                        <h3>{x.questions}</h3>
                        <div>
                            <h3>Right:</h3>
                            { filterAnswers(x.answers, true).map(x => { return ( <p className={styles.result_answer}> {x.answer}</p> )})}

                            <h3>Wrong:</h3>
                            { filterAnswers(x.answers, false).map(x => { return ( <p className={styles.result_answer}> {x.answer}</p> )})}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}