import { AppDispatch } from './store'
import { setData } from './reducers/tableSlice'
import axios from 'axios'
import { ResultItems } from '../types/DataType'

export const fetchDataFromAPI =
    (limit: number, offset: number) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get(
                `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${limit}&offset=${offset}`
            )
            const data = response.data
            const results = data.results
            dispatch(setData(results))
        } catch (error) {
            console.error('Помилка при отриманні даних:', error)
        }
    }

export const updateDataOnAPI =
    (id: number, newData: ResultItems) => async (dispatch: AppDispatch) => {
        try {
            await axios.patch(
                `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`,
                newData
            )
        } catch (error) {
            console.error('Помилка при зміні даних:', error)
        }
    }

export const deleteDataOnAPI =
    (id: number) => async (dispatch: AppDispatch) => {
        try {
            await axios.delete(
                `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`
            )
        } catch (error) {
            console.error('Помилка при зміні даних:', error)
        }
    }

export const postDataOnAPI = (newData: ResultItems) => async () => {
    try {
        await axios.post(
            `https://technical-task-api.icapgroupgmbh.com/api/table/`,
            newData
        )
    } catch (error) {
        console.error('Помилка при додаванні даних:', error)
    }
}
