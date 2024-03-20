import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }

const tokens10001 = (size) => <><img src='https://commudao.cmhexa.com/items/wood.png' width={size + 'px'} alt='wood'></img>&nbsp;&nbsp;WOOD</>
const tokens10002 = (size) => <><img src='https://commudao.cmhexa.com/items/tuna.png' width={size + 'px'} alt='tuna'></img>&nbsp;&nbsp;TUNA</>
const tokens10003 = (size) => <><img src='https://commudao.cmhexa.com/items/mice.png' width={size + 'px'} alt='mice'></img>&nbsp;&nbsp;MICE</>
const tokens10004 = (size) => <><img src='https://commudao.cmhexa.com/items/copper.png' width={size + 'px'} alt='copper'></img>&nbsp;&nbsp;COPPER</>
const tokens10005 = (size) => <><img src='https://commudao.cmhexa.com/items/jasper.png' width={size + 'px'} alt='jasp'></img>&nbsp;&nbsp;JASP</>
const tokens10006 = (size) => <><img src='https://commudao.cmhexa.com/tokens/jdao.png' width={size + 'px'} alt='jdao'></img>&nbsp;&nbsp;JDAO</>

const tokens1 = (size) => <><img src='https://commudao.cmhexa.com/tokens/cmj.png' width={size + 'px'} alt='cmj'></img>&nbsp;&nbsp;CMJ</>
const tokens2 = (size) => <><img src='https://commudao.cmhexa.com/tokens/jusdt.png' width={size + 'px'} alt='jusdt'></img>&nbsp;&nbsp;JUSDT</>

const Gettoken = ({ gettoken, setGettoken, offertoken }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleSelect = (getindex) => {
        setGettoken(getindex)
        handleClose()
    }

    return (
        <>
            <Button sx={{fontFamily: "Inter-ExtraBold", fontSize: "14px"}} onClick={handleOpen}>
                {gettoken === 10001 ? tokens10001(30) : <></>}
                {gettoken === 10002 ? tokens10002(30) : <></>}
                {gettoken === 10003 ? tokens10003(30) : <></>}
                {gettoken === 10004 ? tokens10004(30) : <></>}
                {gettoken === 10005 ? tokens10005(30) : <></>}
                {gettoken === 10006 ? tokens10006(30) : <></>}

                {gettoken === 1 ? tokens1(30) : <></>}
                {gettoken === 2 ? tokens2(30) : <></>}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="Tokenmodal" sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "Inter-ExtraBold" }}>
                        Select a Token
                        <Divider />
                    </Typography>
                    {offertoken <= 10000 ?
                        <>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10001)}>{tokens10001(20)}</Button>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10002)}>{tokens10002(20)}</Button>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10003)}>{tokens10003(20)}</Button>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10004)}>{tokens10004(20)}</Button>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10005)}>{tokens10005(20)}</Button>
                            <Button sx={{ mt: 2 }} onClick={() => handleSelect(10006)}>{tokens10006(20)}</Button>
                        </> :
                        <>
                            <Button sx={{ mt: 2 }} disabled>{tokens10001(20)}</Button>
                            <Button sx={{ mt: 2 }} disabled>{tokens10002(20)}</Button>
                            <Button sx={{ mt: 2 }} disabled>{tokens10003(20)}</Button>
                            <Button sx={{ mt: 2 }} disabled>{tokens10004(20)}</Button>
                            <Button sx={{ mt: 2 }} disabled>{tokens10005(20)}</Button>
                            <Button sx={{ mt: 2 }} disabled>{tokens10006(20)}</Button>
                        </>
                    }
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "Inter-ExtraBold", mt: 2 }}>
                        Select a Currency
                        <Divider />
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={() => handleSelect(1)}>{tokens1(20)}</Button>
                    <Button sx={{ mt: 2 }} onClick={() => handleSelect(2)}>{tokens2(20)}</Button>
                </Box>
            </Modal>
        </>
    )
}

export default Gettoken