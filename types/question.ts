export type Question = 
{
    id:number;
    questions:string[];
    single_choice:boolean;
    answers:Answer[];
    explanation:Explanation;
}

export type Answer =
{
    answer:string;
    check:false;
}

export type Explanation =
{
    correct: string;
    incorrect:string;
    reference:string;
}