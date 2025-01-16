import styles from '@/styles/QuizProgress.module.css'

export default function QuizProgress(props:any)
{
    const {index, max} = props;

    let width = (index+1) / max * 100;

    const onClickHandler = (e:any) =>
    {
        const quizButton = document.getElementById('krasser_geiler_button') as HTMLButtonElement;
        
        if(!quizButton) return;

        quizButton.click();

        e.target.innerText = quizButton.innerText;
        width = (index+1) / max * 100
    }

    return (
        <div className={styles.quiz_progress}>
            <p>{`${index+1}/${max}`}</p>
            <div className={styles.progress_background}>
                <div className={styles.progress_bar} style={{width:`${width}%`}}></div>
            </div>
            <button className={styles.check_button} onClick={onClickHandler}>Check</button>
        </div>
    )
}