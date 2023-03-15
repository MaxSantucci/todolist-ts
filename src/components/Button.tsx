import React from 'react';
import {filterValueType} from "../App";

type ButtonType = {
   name: filterValueType;
   ignition: () => void

}

export  const Button = (props: ButtonType) => {

   const onClickHandler = () => {
      props.ignition()
   }

   return (
      <button onClick={onClickHandler}>{props.name}</button>
   );
};

