import React, { useContext } from 'react';
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled, almost, correct }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

  function selectLetter() {
    if(keyVal === "ENTER"){
      onEnter()
    } else if (keyVal === "DELETE"){
      onDelete()
    } else {
      onSelectLetter(keyVal)
    }
  }

  return (
    <div className='key' id={ bigKey ? 'big' : disabled ? "disabled" : correct ? "correct" : almost && "almost" } onClick={selectLetter} key={keyVal}>
      { keyVal }
    </div>
  );
};

export default Key;