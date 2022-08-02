import { useState } from 'react'
import { InputSearch } from '../../components/InputSearch';
import { Body } from '../../components/Body';
import { FilterDataProvider } from '../../contexts/FilterContext';



import './style.css'

export function App() {

  const [searchStr, setSearchStr] = useState('')


  return (
    <FilterDataProvider>
      <>
      <header>
        <div className="ribbon">
          <span>
          Lista de Itens Pokémon
          </span>
        </div>
        <InputSearch itemNameHandler={setSearchStr} />
      </header>
        <Body searchStr={searchStr} />
      </>
    </FilterDataProvider>
  );

}

export default App;
