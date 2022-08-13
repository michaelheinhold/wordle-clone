import WordGrid from './components/WordGrid';
import { boardDefault } from "./Words";
import './App.css';
import { createContext, useState } from "react";
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  function onSelectLetter(keyVal) {
    if(currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  function onEnter(){
    if(currAttempt.letterPos < 5) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  }

  function onDelete(){
    if(currAttempt.letterPos < 1 ) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
  }

  return (
    <div className="App">
      <div className='nav'>Michale</div>
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onEnter, onDelete }}>
        <WordGrid />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
