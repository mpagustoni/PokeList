import IItem from './IItem'

export interface IPagination {
    actualPage: number,
    totalPages: number
}
export default interface IFilterContextData {
    searchStr: string,
    setSearchStr: Function,
    list: IItem[],
    setList: Function,
    goToNextPage: Function,
    goToPreviousPage: Function,
    previousPage:string,
    nextPage: string,
    pagination: IPagination
}