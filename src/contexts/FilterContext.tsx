import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';
import apiClient from '../services/apiClient'
import IFilterContextData from '../models/IFilterContextData';
import IItem from '../models/IItem'
import { IPagination } from '../models/IFilterContextData';



interface IProps {
    children: JSX.Element
}

const FilterContext = createContext<IFilterContextData>({} as IFilterContextData);


export function FilterDataProvider({ children }: IProps) {
    const [searchStr, setSearchStr] = useState<string>('');
    //const [selectedType, setSelectedType] = useState<string>('');
    const [pagination, setPagination] = useState<IPagination>({ actualPage: 1, totalPages: 1 });
    const [list, setList] = useState<IItem[]>([])
    const [nextPage, setNextPage] = useState<string>()
    const [previousPage, setPreviousPage] = useState<string>()

    useEffect(() => {
        if (searchStr) {
            console.log("list com props: ", searchStr)
            apiClient.get(`item/${searchStr}`).then(
                response => {
                    calcPagination('', response.data.count); setList([{ name: response.data.name }])
                    setNextPage(response.data.next)
                    setPreviousPage(response.data.previous)
                }
            ).catch(error => {
                console.log(error)
                setList([]);
            })
        } else {
            console.log("list sem props: ", searchStr)
            apiClient.get('item').then(
                response => {
                    calcPagination('', response.data.count);
                    setList(response.data.results)
                    setNextPage(response.data.next)
                    setPreviousPage(response.data.previous)
                }
            ).catch(error => {
                console.log(error)
                setList([]);
            })
        }
    }, [searchStr])

    function calcPagination(url: string, count: number) {
        const offsetParam = url.match('[?&]' + 'offset' + '=([^&]+)');
        if (offsetParam) {
            const offset = parseInt(offsetParam[1]);
            setPagination({ actualPage: Math.ceil(offset / 20) + 1, totalPages: Math.ceil(count / 20) })
        } else {
            setPagination({ actualPage: 1, totalPages: Math.ceil(count / 20) });
        }

    }
    function goToNextPage() {
        console.log("chamou goToNextPage")
        if (nextPage) {
            apiClient.get(nextPage).then(response => {
                calcPagination(nextPage, response.data.count);
                setList(response.data.results)
                setNextPage(response.data.next)
                setPreviousPage(response.data.previous)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function goToPreviousPage() {
        console.log("chamou goToPreviousPage")
        if (previousPage) {
            apiClient.get(previousPage).then(response => {
                calcPagination(previousPage, response.data.count);
                setList(response.data.results)
                setNextPage(response.data.next)
                setPreviousPage(response.data.previous)
            }).catch(error => {
                console.log(error)
            })
        }
    }


    return (
        <FilterContext.Provider value={
            {
                searchStr,
                setSearchStr,
                list,
                setList,
                goToNextPage,
                goToPreviousPage,
                previousPage,
                nextPage,
                pagination
            } as IFilterContextData
        }>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter deve estar dentro de um context.");
    } else {
        return context;
    }
}