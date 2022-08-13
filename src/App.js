import WordGrid from './components/WordGrid';
import { boardDefault, generateWordSet } from "./Words";
import './App.css';
import { createContext, useEffect, useState } from "react";
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [almostLetters, setAlmostLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])

  const correctWord = "RIGHT";

  useEffect(() => {
    generateWordSet().then((words) =>{
      setWordSet(words.wordSet)
    });
  }, [])

  function onSelectLetter(keyVal) {
    if(currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  function onEnter(){
    if(currAttempt.letterPos < 5) return;

    let currWord = "";
    for(let i= 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("not a word in the word list")
    }

    if(currWord === correctWord){
      alert("good job!")
    }
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
      <div className="nav">Michale</div>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          almostLetters,
          setAlmostLetters,
          correctLetters,
          setCorrectLetters
        }}
      >
        <WordGrid />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
