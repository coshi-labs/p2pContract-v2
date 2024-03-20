import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'

import Button from '@mui/material/Button'
import PendingIcon from '@mui/icons-material/Pending'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import p2pcallABI from '../ABI/p2pcallABI.json'
import kap20ABI from '../ABI/kap20ABI.json'

const Hex = ethers.utils.parseEther(String(10**8))
const p2pcore = "0x0bC24195a7aF3d92A6590dAB77aD7b3d63e0d83c" 
const p2pcall = "0x9584DBee67498f2Be49614DCe1cAb1ae87488339"

const woodtoken = "0xc2744Ff255518a736505cF9aC1996D9adDec69Bd"
const tunatoken = "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381"
const micetoken = "0x09DE640ecd50e1c81bCB266279e3ffC2719873df"
const coppertoken = "0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841"
const jaspertoken = "0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860"
const jdaotoken = "0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88"
const cmjtoken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jusdttoken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"

const tokenscurrency = [null, cmjtoken, jusdttoken]
const tokensitem = [null, woodtoken, tunatoken, micetoken, coppertoken, jaspertoken, jdaotoken]

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }
   
const Dealwait = ({ offer, get, fee, sendtoken, sendamount, sendbalance, feetoken, feeamount, feebalance, sender, receiver, timetoReject, dealnum, setDealnum, dealupdate, setDealupdate, setTarget, navigate }) => {
    const { address } = useAccount()
    const { chain } = useNetwork()

    const [open, setOpen] = React.useState(false)
    const [dealerror, setDealerror] = React.useState(null)
    const [isConfirm, setIsconfirm] = React.useState(null)

    const rejectDeal = async (_dealindex) => {
        setDealerror(null)
        setIsconfirm(null)
        setDealupdate(null)
        setOpen(true)
        try {
            const config = await prepareWriteContract({
                address: p2pcall,
                abi: p2pcallABI,
                functionName: 'callRejectDeal',
                args: [_dealindex],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setIsconfirm(false)
            setDealupdate(tx.hash)
        } catch (e) {
            setDealerror(e.message.slice(0, 175))
        }
    }

    const confirmDeal = async (_dealindex) => {
        setDealerror(null)
        setIsconfirm(null)
        setDealupdate(null)
        setOpen(true)
        try {
            const feeAllowforCall = await readContract({
                address: tokenscurrency[feetoken],
                abi: kap20ABI,
                functionName: 'allowance',
                args: [address, p2pcall],
            })
            if (Number(feeamount) > Number(ethers.utils.formatEther(feeAllowforCall))) {
                const config = await prepareWriteContract({
                    address: tokenscurrency[feetoken],
                    abi: kap20ABI,
                    functionName: 'approve',
                    args: [p2pcall, Hex],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            if (Number(sendtoken) <= 10000) {
                const sendAllowforCore = await readContract({
                    address: tokenscurrency[sendtoken],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcore],
                })
                if (Number(sendamount) > Number(ethers.utils.formatEther(sendAllowforCore))) {
                    const config2 = await prepareWriteContract({
                        address: tokenscurrency[sendtoken],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcore, Hex],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (Number(sendtoken) >= 10001) {
                const sendAllowforCore = await readContract({
                    address: tokensitem[sendtoken - 10000],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcore],
                })
                if (Number(sendamount) > Number(ethers.utils.formatEther(sendAllowforCore))) {
                    const config2 = await prepareWriteContract({
                        address: tokensitem[sendtoken - 10000],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcore, Hex],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            }
            const config3 = await prepareWriteContract({
                address: p2pcall,
                abi: p2pcallABI,
                functionName: 'callConfirmDeal',
                args: [_dealindex, false],
            })
            const tx = await writeContract(config3)
            await tx.wait()
            setIsconfirm(true)
            setDealupdate(tx.hash)
        } catch (e) {
            setDealerror(e.message.slice(0, 175))
        }
    }

    return (
        <div className="Dealcard">
            {sender !== null && sender !== "" && sender !== "0x0000000000000000000000000000000000000000" && address !== undefined && address !== null ?
                <>
                    {sender.toUpperCase() === address.toUpperCase() || receiver.toUpperCase() === address.toUpperCase() ?
                        <>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                                DEAL #{dealnum}&nbsp;&nbsp;
                                <PendingIcon color="primary" />
                            </div>
                            <Divider />
                            <div style={{height: "60%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", fontFamily: "Inter-ExtraBold", fontSize: "14px"}}>
                                <div style={{color: "#5f6476"}}>WILL SEND</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {sender.toUpperCase() === address.toUpperCase() ? offer : get}
                                </div>
                                {receiver.toUpperCase() === address.toUpperCase() && sender.toUpperCase() !== address.toUpperCase() ?
                                    <>
                                        <div style={{width: "300px", fontSize: "12px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}} className="bold">
                                            <div style={{color: "#5f6476"}}>BALANCE</div>
                                            <div>{Number(sendbalance).toFixed(3)}</div>
                                        </div>
                                    </> :
                                    <></>
                                }
                                <Divider />
                                <div style={{color: "#5f6476"}}>SECURITY FEE [2.5%]</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {fee}
                                </div>
                                {receiver.toUpperCase() === address.toUpperCase() ?
                                    <>
                                        <div style={{width: "300px", fontSize: "12px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}} className="bold">
                                            <div style={{color: "#5f6476"}}>BALANCE</div>
                                            <div>{Number(feebalance).toFixed(3)}</div>
                                        </div>
                                    </> :
                                    <></>
                                }
                                <Divider />
                                <div style={{color: "#5f6476"}}>WILL RECEIVE</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {sender.toUpperCase() === address.toUpperCase() ? get : offer}
                                </div>
                            </div>
                            <Divider />
                            <div style={{height: "23%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                {receiver.toUpperCase() === address.toUpperCase() ?
                                    <>
                                        <Button
                                            sx={{width: "300px", padding: "10px 40px", borderRadius: "10px", fontFamily: "Inter-ExtraBold", fontSize: "16px"}}
                                            variant="contained"
                                            onClick={() => confirmDeal(dealnum)}
                                            disabled=
                                                {chain !== undefined && chain.id === 8899 && ((sendtoken <= 10000 && Number(sendamount) + Number(feeamount) <= Number(sendbalance)) || (sendtoken >= 10001 && Number(sendamount) <= Number(sendbalance) && Number(feeamount) <= Number(feebalance))) ?
                                                    false :
                                                    true
                                                }
                                        >
                                            CONFIRM DEAL
                                        </Button>
                                        {timetoReject === 0 ?
                                            <Button 
                                                sx={{width: "300px", padding: "10px 40px", borderRadius: "10px", fontFamily: "Inter-ExtraBold", fontSize: "16px"}}
                                                variant="outlined"
                                                disabled=
                                                    {chain !== undefined && chain.id === 8899 ?
                                                        false :
                                                        true
                                                    }
                                                onClick={() => rejectDeal(dealnum)}
                                            >
                                                REJECT DEAL
                                            </Button> :
                                            <Button sx={{width: "300px", padding: "3px 40px", borderRadius: "10px", fontFamily: "Inter-ExtraBold", fontSize: "12px"}} variant="outlined" disabled>
                                                REJECTABLE AT <br></br>{timetoReject}
                                            </Button>
                                        }
                                    </> :
                                    <Button
                                        sx={{width: "300px", padding: "10px 40px", borderRadius: "10px", fontFamily: "Inter-ExtraBold", fontSize: "16px"}}
                                        variant="outlined"
                                        disabled=
                                            {chain !== undefined && chain.id === 8899 ?
                                                false :
                                                true
                                            }
                                        onClick={() => rejectDeal(dealnum)}
                                    >
                                        REJECT DEAL
                                    </Button>
                                }
                                <Modal
                                    open={open}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        {dealerror === null ? 
                                            <>
                                                {dealupdate === null ?
                                                    <>
                                                        <CircularProgress size="14px" />
                                                        &nbsp;&nbsp;Transaction is pending
                                                    </> :
                                                    <>
                                                        {isConfirm === false ?
                                                            <>
                                                                <div style={{width: "fit-content", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                    <CancelScheduleSendIcon size="14px" />
                                                                    <div style={{marginLeft: "10px"}}>Deal#{dealnum} has rejected</div>
                                                                </div>
                                                                <br></br><Button href={"https://exp-l1.jibchain.net/tx/" + dealupdate} target="_blank" rel="noopener">View transaction on block explorer</Button>
                                                                <br></br><Button onClick={() => window.location.reload()}>Close</Button>
                                                            </> :
                                                            <>
                                                                <div style={{width: "fit-content", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                    <DoneAllIcon size="14px" />
                                                                    <div style={{marginLeft: "10px"}}>Deal#{dealnum} has completed</div>
                                                                </div>
                                                                <br></br><Button href={"https://exp-l1.jibchain.net/tx/" + dealupdate} target="_blank" rel="noopener">View transaction on block explorer</Button>
                                                                <br></br><Button onClick={() => window.location.reload()}>Close</Button>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </> :
                                            <>
                                                {dealerror}
                                                <br></br><br></br><Button onClick={() => setOpen(false)}>Close</Button>
                                            </>
                                        }
                                    </Box>
                                </Modal>
                            </div>
                        </> :
                        <>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                                DEAL #{dealnum}
                            </div>
                            <Divider />
                            <div style={{height: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontFamily: "Inter-ExtraBold", fontSize: "14px"}}>
                                <BrokenImageIcon sx={{ fontSize: 140 }} />
                                <Divider />
                                This deal is not available for you
                            </div>
                        </>
                    }
                </> :
                <>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                        DEAL #{dealnum}
                    </div>
                    <Divider />
                    <div style={{height: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontFamily: "Inter-ExtraBold", fontSize: "14px"}}>
                        <BrokenImageIcon sx={{ fontSize: 140 }} />
                        <Divider />
                        This deal is not available for you
                    </div>
                </>
            }
        </div>

    )
}

export default Dealwait