import React, { useEffect, useState } from "react";
// import { formatTime } from '../utils/index';

const End = ({result , data, onAnswerCheck, onReset , time}) => {
    const [corresctAnswer , setCorrectAnswer] = useState(0);

    useEffect(() => {
        let correct = 0;
        result.forEach((result , index) => {
            if(result.a === data[index].answer){
                correct = correct + 1
            }
        })
        setCorrectAnswer(correct)
    },[result, data])

    return(
        <>
        <div className="card">
            <div className="card-content">
                <div className="content">
                <h3>Hasil Anda</h3>
                <p><strong>{corresctAnswer} of {data.lenght}</strong></p>
                <p><strong>Waktu kamu : </strong>{formatTime(time)}</p>
                <button className="button is-info mr-2" onClick={onAnswerCheck}> Hasil Anda</button>
                <button className="button is-success" onClick={onReset}>Coba Kembali</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default End;