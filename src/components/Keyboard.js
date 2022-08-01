import React from 'react';
import Key from './Key'

const Keyboard = () => {
  const key1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const key2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const key3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div>
      <div className='row '>
        { key1.map(key => {
          return(
            <Key keyVal={key} />
          )
        })}
      </div>
      <div className='row'>
        { key2.map(key => {
          return(
            <Key keyVal={key} />
          )
        })}
      </div>
      <div className='row'>
        <Key keyVal={"ENTER"} bigKey />
        { key3.map(key => {
          return(
            <Key keyVal={key} />
          )
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;