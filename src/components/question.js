import React, { useEffect, useRef, useState } from 'react';
// import { formatTime } from '../utils/index';

const Question = ({ data ,onAnswerUpdate, activeQuestion , numberOfQuestions ,onSetActiveQuestion , time , onesetStep }) => {

    const[selected, setSelected] = useState('');
    const[error , setError] = useState('');
    const radioWrapper = useRef();

    useEffect(() => {
        const findCheckedInput = radioWrapper.current.querySelector('input:checked');
        if(findCheckedInput){
            findCheckedInput.checked = false;
        }
    },[data])


    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error){
            setError('')
        }

    }
    const nextClickHanlder = () => {
        if(selected === '') {
            return setError('Silahkan Pilih Jawaban Terlebih Dahulu');
        }
        onAnswerUpdate(prevState => [...prevState, {q: data.question, a: selected}]);
        setSelected('')
        if(activeQuestion < numberOfQuestions-1){
            onSetActiveQuestion(activeQuestion+1)
        }else{
            onesetStep(3)
        }
    }
    useEffect(() => {
        return () =>{
            if(formatTime(time) === '10s'){
                onesetStep(3)
            }
        }
    })

    return(
        <>
        <div style={{display:"table-row"}}>
            <div>
                <h5 style={{textAlign:"center",marginBottom:20,fontSize: 20}}>{formatTime(time)}</h5>
                <h5 style={{textAlign:"center",marginBottom:20,fontSize: 20, color: 'red'}}>Waktu Anda Untuk Mengerjakan Hanya 10 Detik</h5>
            </div>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <h2 className="mb-5">{data.question}</h2>
                        <div className="control" ref={radioWrapper}>
                                {data.choices.map((choices, i)=> (
                                        <label className="radio has-background-light" key={i}>
                                            <input type="radio" name="answer" value={choices} onChange={changeHandler}/>
                                            {choices}
                                        </label>
                                    ))}
                        </div>
                        <button className="button is-success is-medium is-fullwidth mt-4" onClick={nextClickHanlder}>Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Question;