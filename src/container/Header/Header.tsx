import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import './Header.scss'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { isUserAuthenticated } from '../../authentication'
import AddForm from '../../components/AddForm/AddForm'
import { useState } from 'react'

type Props = {}

const Header = (props: Props) => {
    const isAuthenticated = isUserAuthenticated('', '')

    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => setOpen(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')

        window.location.reload()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="header_container">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Typography
                            className="logo"
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <ReceiptLongIcon />
                            DataView Hub
                        </Typography>
                    </IconButton>
                    {isAuthenticated ? (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleOpen}
                        >
                            Add New
                        </Button>
                    ) : null}

                    {isAuthenticated ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
            <AddForm open={open} handleClose={handleClose} />
        </Box>
    )
}

export default Header
