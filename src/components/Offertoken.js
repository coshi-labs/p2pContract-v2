import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }

const tokens10001 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4' width={size + 'px'} alt='wood'></img>&nbsp;&nbsp;WOOD</>
const tokens10002 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe' width={size + 'px'} alt='tuna'></img>&nbsp;&nbsp;TUNA</>
const tokens10003 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i' width={size + 'px'} alt='mice'></img>&nbsp;&nbsp;MICE</>
const tokens10004 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq' width={size + 'px'} alt='copper'></img>&nbsp;&nbsp;COPPER</>
const tokens10005 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy' width={size + 'px'} alt='jasp'></img>&nbsp;&nbsp;JASP</>
const tokens10006 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq' width={size + 'px'} alt='jdao'></img>&nbsp;&nbsp;JDAO</>

const tokens1 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u' width={size + 'px'} alt='cmj'></img>&nbsp;&nbsp;CMJ</>
const tokens2 = (size) => <><img src='https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi' width={size + 'px'} alt='jusdt'></img>&nbsp;&nbsp;JUSDT</>

const Offertoken = ({ offertoken, setOffertoken, gettoken }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleSelect = (offerindex) => {
        setOffertoken(offerindex)
        handleClose()
    }

    return (
        <>
            <Button sx={{fontFamily: "Inter-ExtraBold", fontSize: "14px"}} onClick={handleOpen}>
                {offertoken === 10001 ? tokens10001(30) : <></>}
                {offertoken === 10002 ? tokens10002(30) : <></>}
                {offertoken === 10003 ? tokens10003(30) : <></>}
                {offertoken === 10004 ? tokens10004(30) : <></>}
                {offertoken === 10005 ? tokens10005(30) : <></>}
                {offertoken === 10006 ? tokens10006(30) : <></>}

                {offertoken === 1 ? tokens1(30) : <></>}
                {offertoken === 2 ? tokens2(30) : <></>}
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
                    {gettoken <= 10000 ?
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

export default Offertoken