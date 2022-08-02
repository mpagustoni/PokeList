
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Card from '../Card/Card';
import { FilterDataProvider, useFilter } from '../../contexts/FilterContext';
import './style.css';

interface IItem {
    name: string,
}

export default function List() {
    const { list, previousPage, nextPage, goToPreviousPage, goToNextPage, pagination } = useFilter();
    console.log(typeof list)
    return (
        <FilterDataProvider>
            {list.length > 0 ? <div className="tableContainder" >
                <div className="card-table" >
                    {list.map(function (item: IItem) {
                        return <Card key={item.name} name={item.name} />
                    })}
                </div>
                <div className="paginator">
                    <button className="pageBtn " hidden={!previousPage} onClick={() => goToPreviousPage}>anterior</button>
                    <span>Página {pagination.actualPage} / {pagination.totalPages}</span>
                    
                    <button className="pageBtn " hidden={!nextPage} onClick={() => goToNextPage()}>próximo</button>
                </div>
            </div> :
                <div>
                    <h2>Sem resultados.</h2>
                </div>}
        </FilterDataProvider>
    )

}