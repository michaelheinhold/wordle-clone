import { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters, setAlmostLetters, setCorrectLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "wrong")

  useEffect(() => {
    if (letter !== "" && !correct && !almost ) {
      setDisabledLetters((prev) => [...prev, letter])
    }
    if (letter !== "" && !correct && almost ) {
      setAlmostLetters((prev) => [...prev, letter])
    }
    if (letter !== "" && correct && !almost ) {
      setCorrectLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attempt])

  return(
    <div className="tile" id={letterState}>{letter}</div>
  )
}

export default Letter;