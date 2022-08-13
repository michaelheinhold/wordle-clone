import WordGrid from './components/WordGrid';
import { boardDefault, generateWordSet } from "./Words";
import './App.css';
import { createContext, useEffect, useState } from "react";
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [almostLetters, setAlmostLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState("")

  useEffect(() => {
    generateWordSet().then((words) =>{
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord.toUpperCase())
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
      if(currWord === correctWord){
        setGameOver({gameOver: true, guessedWord: true})
        return;
      }

      if (currAttempt.attempt === 5){
        setGameOver({gameOver: true, guessedWord: false})
      }
    } else {
      alert("not a word in the word list")
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
          setCorrectLetters,
          gameOver,
          setGameOver
        }}
      >
        <WordGrid />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
