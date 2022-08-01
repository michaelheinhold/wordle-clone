import WordGrid from './components/WordGrid';
import { boardDefault } from "./Words";
import './App.css';
import { createContext, useState } from "react";
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App() {
  const submittedWord = 'prime';
  const correctWord = 'Cramp'
  function checkWord(submittedWord, correctWord){
    const submittedArray = submittedWord.toLowerCase().split('');
    const correctArray = correctWord.toLowerCase().split('');
    let newCorrectArray;
    submittedArray.forEach(letter => {
      for(var i=0; i< correctArray.length; i++){
        if(letter === correctArray[i]){
          if(submittedArray[i] === correctArray[i]){
            newCorrectArray = correctArray.filter(correctLetter => correctLetter !== letter)
          }
        }
      }
    });
  }
  checkWord(submittedWord, correctWord);
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
    if(currAttempt.letterPos < 4) return;
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
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onEnter, onDelete }}>
        <WordGrid />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
