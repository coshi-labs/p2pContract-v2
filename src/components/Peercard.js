import React from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import IconButton from '@mui/material/IconButton'
import { Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Yourcard = ({ target }) => {
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(target)
    }

    return (
        <div className="Peercard">
            <div style={{width: "90%"}} className="bold">Peer status</div>
            {target !== undefined && target !== null ?
                <>
                    <Jazzicon diameter={180} seed={jsNumberForAddress(target.toUpperCase())} />
                    {target !== "" ?
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}} className="NameCard">
                            <div>{target.slice(0, 4) + "..." + target.slice(-4)}</div>
                            <IconButton size="small" onClick={handleClick}><ContentCopyIcon sx={{ fontSize: 16 }} color="primary" /></IconButton>
                            <Snackbar
                                open={open}
                                onClose={() => setOpen(false)}
                                autoHideDuration={2000}
                                message="Copied to clipboard"
                            />
                        </div> :
                        <div className="NameCard">Please enter<br></br>an address</div>
                    }
                    <div style={{height: "120px"}}></div>
                </> :
                <></>
            }
        </div>
    )
}

export default Yourcard