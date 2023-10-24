import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataType, ResultItems } from '../../types/DataType'

interface TableState {
    data: ResultItems[]
}

const initialState: TableState = {
    data: [],
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ResultItems[]>) => {
            state.data = action.payload
        },
    },
})

export const { setData } = tableSlice.actions

export default tableSlice.reducer
