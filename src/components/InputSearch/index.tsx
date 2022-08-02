import './style.css'

import lupa from "../../images/lupa.png"
import {FilterDataProvider, useFilter} from '../../contexts/FilterContext';
import { useState } from 'react';

type headerProps = {
  itemNameHandler: Function;
};

export function InputSearch(props: headerProps) {
  const {searchStr,setSearchStr} = useFilter();
  const [inputValue, setInputValue]= useState("");

  function handleSearch(){
    console.log(searchStr)
    setSearchStr(inputValue);
  }
  return (
    <div className="header-content">
          <input className="input-search" type="text" value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder="Digite aqui sua busca..." />
          <img className="search-icon" alt=" " src={lupa} onClick={() => setSearchStr(inputValue)} />
        </div>
  );
}
