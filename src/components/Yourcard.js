import React from 'react'
import { useAccount } from 'wagmi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import IconButton from '@mui/material/IconButton'
import { Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Yourcard = () => {
    const { address } = useAccount()
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(address)
    }

    return (
        <div className="Peercard">
            <div style={{width: "90%"}} className="bold">Your status</div>
            {address !== undefined && address !== null ?
                <>
                    <Jazzicon diameter={180} seed={jsNumberForAddress(address.toUpperCase())} />
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}} className="NameCard">
                        <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div>
                        <IconButton size="small" onClick={handleClick}><ContentCopyIcon sx={{ fontSize: 16 }} color="primary" /></IconButton>
                        <Snackbar
                            open={open}
                            onClose={() => setOpen(false)}
                            autoHideDuration={2000}
                            message="Copied to clipboard"
                        />
                    </div>
                    <div style={{height: "120px"}}></div>
                </> :
                <>
                    <Jazzicon diameter={180} seed={jsNumberForAddress("0x1234")} />
                    <div className="NameCard">Please connect a wallet</div>
                    <div style={{height: "120px"}}></div>
                </>
            }
        </div>
    )
}

export default Yourcard