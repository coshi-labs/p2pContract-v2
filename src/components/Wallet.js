import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
   
const Wallet = () => {
    const { address, isConnected } = useAccount()
    const { connect, connectors, error } = useConnect()
    const { disconnect } = useDisconnect()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null)}

    return (
        <>
            {isConnected ?
                <>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{width: "fit-content", padding: "5px 30px", margin: "10px", letterSpacing: 1, fontFamily: "Inter-ExtraBold"}}
                        variant="contained"
                        onClick={handleClick}
                    >
                        {address.slice(0, 4) + "..." + address.slice(-4)}
                    </Button>
                    <Menu
                        id="basic-menu"
                        aria-labelledby="basic-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuList dense>
                            <MenuItem sx={{width: 150, fontSize: 14, letterSpacing: 1 }} onClick={disconnect}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </> :
                <>
                    {connectors.map((connector) => (
                        <Button
                            sx={{width: "fit-content", padding: "5px 30px", margin: "10px", letterSpacing: 1, fontFamily: "Inter-ExtraBold"}}
                            key={connector.id}
                            onClick={() => {connect({ chainId: 96, connector }); handleClose();}}
                            variant="contained"
                        >
                            {error ? <div>{error.message}</div> : <div>CONNECT WALLET</div>}
                        </Button>
                    ))}
                </>
            }
        </>
    )
}

export default Wallet