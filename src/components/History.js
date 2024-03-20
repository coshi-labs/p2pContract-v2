import React from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import Button from '@mui/material/Button'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import HistoryIcon from '@mui/icons-material/History'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import p2pcoreABI from '../ABI/p2pcoreABI.json'
const p2pcore = "0x0bC24195a7aF3d92A6590dAB77aD7b3d63e0d83c" 
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')
const p2pcoreSC = new ethers.Contract(p2pcore, p2pcoreABI, providerJBC)
   
const History = ({ setDealnum, setIsdealsuccess, dealupdate, setTarget, navigate }) => {
    const { address } = useAccount()

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)
    const handleToggle = () => {setOpen((prevOpen) => !prevOpen)}
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return
        }
        setOpen(false)
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        } else if (event.key === 'Escape') {
            setOpen(false)
        }
    }
    const prevOpen = React.useRef(open)
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus()
        }
        prevOpen.current = open
    }, [open])

    const handleSelect = (arg) => {
        setIsdealsuccess(null)
        setDealnum(arg[0])
        setTarget(String(arg[1]))
        navigate("/deal/" + arg[0])
        setOpen(false)
    }

    const [dealComplete, setDealComplete] = React.useState([])

    React.useEffect(() => {
        setOpen(false)
        setDealComplete([])

        const thefetch = async () => {
            const dealcompleteFilter = await p2pcoreSC.filters.ConfirmDeal(null, null, null, null)
            const dealcomplete = await p2pcoreSC.queryFilter(dealcompleteFilter, 850000, "latest")
            const dealcompleteMap = await Promise.all(dealcomplete.filter((obj) => {return (obj.args.receiver.toUpperCase() === address.toUpperCase() || obj.args.sender.toUpperCase() === address.toUpperCase())}).map(async obj => {
                const sender = obj.args.sender.slice(0, 4) + "..." + obj.args.sender.slice(-4)
                const receiver = obj.args.receiver.slice(0, 4) + "..." + obj.args.receiver.slice(-4)

                return {
                    Sender: obj.args.sender,
                    SenderDisp: sender,
                    Receiver: obj.args.receiver,
                    ReceiverDisp: receiver,
                    DealIndex: obj.args.dealIndex,
                    Timestamp: new Date((await providerJBC.getBlock(obj.blockNumber)).timestamp * 1000),
                    Status: true,
                }
            }))
            
            return [
                dealcompleteMap
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setDealComplete(result[0].sort((a, b) => b.DealIndex - a.DealIndex))
        })
    }, [address, dealupdate])

    return (
        <>
            <Button
                id="composition-button"
                sx={{padding: 0, margin: "10px 0"}}
                aria-controls={open ? 'composition-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                ref={anchorRef}
                onClick={() => {if (dealComplete.length !== 0) {handleToggle()}}}
            >
                <HistoryIcon color="primary" />
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
                sx={{maxHeight: 0}}
            >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-end' ? 'right top' : 'left bottom',
                    }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList 
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        sx={{maxHeight: "580px", overflow: "scroll"}}
                        dense
                    >
                        <Typography sx={{ mt: -1, padding: "10px 0 10px 20px", letterSpacing: 1 }}>
                            Completed deals
                        </Typography>
                        <Divider />
                        {dealComplete.map((result, index) => (
                            <MenuItem key={index} sx={{ width: "350px", padding: 2 }} onClick={() => handleSelect(result.Sender.toUpperCase() === address.toUpperCase() ? [Number(result.DealIndex), result.Receiver] : [Number(result.DealIndex), result.Sender])}>
                                <Jazzicon diameter={50} seed={jsNumberForAddress(result.Sender)} />
                                <Paper sx={{ width: "160px", marginLeft: 3, marginRight: 3.5, background: "transparent"}} elevation={0}>
                                <Typography sx={{ fontSize: 14, letterSpacing: 1 }} color="text.primary" gutterBottom>
                                    Deal#{Number(result.DealIndex)}<br></br>
                                    Offer by {result.Sender.toUpperCase() === address.toUpperCase() ? "You" : result.SenderDisp}
                                </Typography>
                                <Typography sx={{marginTop: 1, fontSize: 10.5}} color="text.secondary" gutterBottom>
                                    {result.Timestamp.toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </Typography>
                                </Paper>
                                <DoneAllIcon />
                            </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </>
    )
}

export default History