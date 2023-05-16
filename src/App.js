import { useState, useEffect } from 'react';
import './App.css';
import Start from './components/start';
import Question from './components/question';
import data from'./data/quiz.json';
import End from './components/end';
import Modal from './components/modal';

const arrayRandom = ([...arr]) => {
  let x = arr.length;
  while(x > 0){
    const i = Math.floor(Math.random() * x--);
    [arr[x] , arr[i]] = [arr[i], arr[x]];
  }
  return arr;
}
const resultArray = arrayRandom(data.data).slice(0,5);

let interval;
function App() {
  const [step, setStap] = useState(1);
  const [activeQuestion , setActiveQuestion] = useState(0);
  const [answer , setAnswer] = useState([]);
  const [time , setTime] = useState(0);
  const [showModal , setShowModal] = useState(false)

  useEffect(() => {
    if(step===3){
      clearInterval(interval)
    }
  },[step])

  const quizStartHandle = () => {
    setStap(2);
    interval = setInterval(()=> {
      setTime(prevTime => prevTime + 1)
    },1000)
  }

   const  resetHandler = () => {
    setActiveQuestion(0);
    setAnswer([]);
    setStap(2);
    setTime(0);
    interval = setInterval(()=> {
      setTime(prevTime => prevTime + 1)
    },1000)
   }
  // console.log(answer)
  return (
    <div className="App">
      {step === 1 && <Start onQuizStart={quizStartHandle}/>}
      {step === 2 && <Question 
                              data={resultArray[activeQuestion]}
                              onAnswerUpdate={setAnswer}
                              activeQuestion={activeQuestion}
                              numberOfQuestions={resultArray.length}
                              onSetActiveQuestion = {setActiveQuestion}
                              onesetStep = {setStap}
                              time={time}
                              />}
      {step === 3 && <End
                results = {answer}
                data = {resultArray}
                onReset = {resetHandler}
                onAnswerCheck = {() => setShowModal(true)}
                time = {time}
      />}
      {showModal && <Modal
                      onClose = {() => setShowModal(false)}
                      result = {answer}
                      data= {resultArray}
                    />}
    </div>
  );
}

export default App;
