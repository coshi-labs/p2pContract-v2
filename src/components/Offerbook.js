import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedIcon from '@mui/icons-material/Verified'

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }

const Offerbook = ({ setTarget, setAddr }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleSelect = (addr) => {
        setAddr(addr)
        setTarget(addr)
        handleClose()
    }

    return (
        <>
            <Button sx={{fontFamily: "Inter-ExtraBold", fontSize: "14px"}} onClick={handleOpen}>
                <AccountBoxIcon color="primary" />
                &nbsp;&nbsp;OFFER TO
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "Inter-ExtraBold" }}>
                        Select an Address
                        <Divider />
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={() => handleSelect("0x0Da584E836542Fc58E7c09725cF6dbDfeA22f427")}>
                        <VerifiedIcon color="primary" />
                        &nbsp;&nbsp;zkCoshi [DEV] (0x0D...f427)
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default Offerbook