import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useAppDispatch } from '../../redux/hooks'
import { useState } from 'react'
import { postDataOnAPI, updateDataOnAPI } from '../../redux/tableActions'
import { ResultItems } from '../../types/DataType'
import './AddForm.scss'
import { Button, TextField } from '@mui/material'

type Props = {
    handleClose: () => void
    open: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const AddForm = ({ handleClose, open }: Props) => {
    const dispatch = useAppDispatch()

    const [editedData, setEditedData] = useState<ResultItems>({
        name: '',
        birthday_date: '',
        email: '',
        phone_number: '',
        address: '',
    })

    const handleSave = () => {
        dispatch(postDataOnAPI(editedData))

        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="form" sx={style}>
                <label>Name</label>
                <TextField
                    type="text"
                    value={editedData.name}
                    placeholder="name"
                    onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                    }
                />
                <label>Birthday Date</label>

                <TextField
                    type="date"
                    value={editedData.birthday_date}
                    placeholder="Birthday Date"
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            birthday_date: e.target.value,
                        })
                    }
                />

                <label>Email</label>

                <TextField
                    type="email"
                    value={editedData.email}
                    placeholder="email"
                    onChange={(e) =>
                        setEditedData({ ...editedData, email: e.target.value })
                    }
                />

                <label>Phone Number</label>

                <TextField
                    type="text"
                    value={editedData.phone_number}
                    placeholder="phone_number"
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            phone_number: e.target.value,
                        })
                    }
                />

                <label>Address</label>

                <TextField
                    type="text"
                    value={editedData.address}
                    placeholder="Address"
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            address: e.target.value,
                        })
                    }
                />
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Modal>
    )
}

export default AddForm
