import React, { useContext } from 'react';
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey }) => {
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
    <div className='key' id={ bigKey && 'big' } onClick={selectLetter} key={keyVal}>
      { keyVal }
    </div>
  );
};

export default Key;