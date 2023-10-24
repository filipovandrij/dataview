import { useEffect, useState } from 'react'
import { deleteDataOnAPI, fetchDataFromAPI } from '../../redux/tableActions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Button } from '@mui/material'
import './ItemsList.scss'
import UpdateForm from '../UpdateForm/UpdateForm'

import {
    TablePagination,
    tablePaginationClasses,
} from '@mui/base/TablePagination'

type Props = {}

const ItemsList = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [itemID, setItemID] = useState<number>()

    const data = useAppSelector((state) => state.table.data)
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpen = (id?: number) => {
        setOpen(true)
        if (id !== undefined) {
            setItemID(id)
        }
    }
    const handleClose = () => setOpen(false)

    const handleDelete = (id?: number) => {
        if (id !== undefined) {
            deleteDataOnAPI(id)
            console.log(id)
        }
    }

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchDataFromAPI(100000, 0))
    }, [dispatch])

    return (
        <>
            <UpdateForm
                itemID={itemID}
                open={open}
                handleClose={handleClose}
            ></UpdateForm>

            <table aria-label="custom pagination table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birthday Date</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Control</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? data.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : data
                    ).map(
                        ({
                            id,
                            name,
                            email,
                            birthday_date,
                            phone_number,
                            address,
                        }) => (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{birthday_date}</td>
                                <td>{phone_number}</td>
                                <td>{address}</td>
                                <td>
                                    <Button
                                        onClick={() => handleOpen(id)}
                                        size="small"
                                        variant="contained"
                                    >
                                        update
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={() => handleDelete(id)}
                                    >
                                        delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                    {emptyRows > 0 && (
                        <tr style={{ height: 34 * emptyRows }}>
                            <td colSpan={3} aria-hidden />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 },
                            ]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    'aria-label': 'rows per page',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default ItemsList
