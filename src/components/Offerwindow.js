import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, useContractEvent, useNetwork } from 'wagmi'

import Offernft from './Offernft.js'
import Offertoken from './Offertoken.js'
import Gettoken from './Gettoken.js'
import Offerbook from './Offerbook.js'

import p2pcoreABI from '../ABI/p2pcoreABI.json'
import p2pcallABI from '../ABI/p2pcallABI.json'
import kap20ABI from '../ABI/kap20ABI.json'
import kap721ABI from '../ABI/kap721ABI.json'

import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import SendIcon from '@mui/icons-material/Send'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }

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

const jibjibNft = "0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251"

const tokenscurrency = [null, cmjtoken, jusdttoken]
const tokensitem = [null, woodtoken, tunatoken, micetoken, coppertoken, jaspertoken, jdaotoken]
const nfts = [null, jibjibNft, null]

const Offerwindow = ({ target, setTarget, setDealnum, dealupdate, setDealupdate, setIsdealsuccess, navigate }) => {
    const { address } = useAccount()
    const { chain } = useNetwork()

    const [offertoken, setOffertoken] = React.useState(10001)
    const [offerbalance, setOfferbalance] = React.useState(null)
    const [getbalance, setGetbalance] = React.useState(null)
    const [offeramount, setOfferamount] = React.useState("")
    const [offerfee, setOfferfee] = React.useState(0)
    const [gettoken, setGettoken] = React.useState(1)
    const [getamount, setGetamount] = React.useState("")

    const handleOffer = (event) => {
        setOfferamount(event.target.value)
        if (offertoken <= 9999) {
            setOfferfee((event.target.value * 25) / 1000)
        }
    }

    const handleGet = (event) => {
        setGetamount(event.target.value)
        if (offertoken >= 10001 && gettoken <= 10000) {
            setOfferfee((event.target.value * 25) / 1000)
        }
    }

    React.useEffect(() => {        
        setOfferamount("")
        offertoken >= 10001 && gettoken <= 10000 ?
            setOfferfee((getamount * 25) / 1000) :
            setOfferfee(0)
    }, [offertoken]) // eslint-disable-line
    React.useEffect(() => { setGetamount("") }, [gettoken])

    const [addr, setAddr] = React.useState("")

    const handleTarget = (event) => {
        setAddr(event.target.value)
        setTarget(event.target.value)
    }

    const [open, setOpen] = React.useState(false)
    const [dealerror, setDealerror] = React.useState(null)
    const [dealno, setDealno] = React.useState(0)

    const [offernft, setOffernft] = React.useState(null)
    const [offerid, setOfferid] = React.useState(null)
    const [offername, setOffername] = React.useState(null)
    const [offersrc, setOffersrc] = React.useState(null)

    const [checked, setChecked] = React.useState(false)
    
    const handleOffermode = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked === false) {
            setOffernft(null)
            setOfferid(null)
            setOffername(null)
            setOffersrc(null)
        } else {
            setOffertoken(10001)
            setOfferamount("")
        }
    }

    const offerDeal = async () => {
        setDealerror(null)
        setDealupdate(null)
        setDealno(0)
        setOpen(true)
        try {
            if (offertoken  <= 10000) {
                const feeAllowforCall = await readContract({
                    address: tokenscurrency[offertoken],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcall],
                })
                if (offeramount * 0.025 > Number(ethers.utils.formatEther(feeAllowforCall))) {
                    const config = await prepareWriteContract({
                        address: tokenscurrency[offertoken],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcall, Hex],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const offerAllowforCore = await readContract({
                    address: tokenscurrency[offertoken],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcore],
                })
                if (Number(offeramount) > Number(ethers.utils.formatEther(offerAllowforCore))) {
                    const config2 = await prepareWriteContract({
                        address: tokenscurrency[offertoken],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcore, Hex],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (offernft !== null && gettoken <= 10000) {
                const feeAllowforCall = await readContract({
                    address: tokenscurrency[gettoken],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcall],
                })
                if (getamount * 0.025 > Number(ethers.utils.formatEther(feeAllowforCall))) {
                    const config = await prepareWriteContract({
                        address: tokenscurrency[gettoken],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcall, Hex],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const offerAllowforCore = await readContract({
                    address: nfts[offernft],
                    abi: kap721ABI,
                    functionName: 'getApproved',
                    args: [offerid],
                })
                if (offerAllowforCore.toUpperCase() !== p2pcore.toUpperCase()) {
                    const config2 = await prepareWriteContract({
                        address: nfts[offernft],
                        abi: kap721ABI,
                        functionName: 'approve',
                        args: [p2pcore, offerid],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            } else if (offertoken >= 10001 && gettoken <= 10000) {
                const feeAllowforCall = await readContract({
                    address: tokenscurrency[gettoken],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcall],
                })
                if (getamount * 0.025 > Number(ethers.utils.formatEther(feeAllowforCall))) {
                    const config = await prepareWriteContract({
                        address: tokenscurrency[gettoken],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcall, Hex],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
                const offerAllowforCore = await readContract({
                    address: tokensitem[offertoken - 10000],
                    abi: kap20ABI,
                    functionName: 'allowance',
                    args: [address, p2pcore],
                })
                if (Number(offeramount) > Number(ethers.utils.formatEther(offerAllowforCore))) {
                    const config2 = await prepareWriteContract({
                        address: tokensitem[offertoken - 10000],
                        abi: kap20ABI,
                        functionName: 'approve',
                        args: [p2pcore, Hex],
                    })
                    const approvetx2 = await writeContract(config2)
                    await approvetx2.wait()
                }
            }
            if (offernft === null) {
                const config3 = await prepareWriteContract({
                    address: p2pcall,
                    abi: p2pcallABI,
                    functionName: 'callOfferDeal',
                    args: [false, target, offertoken, ethers.utils.parseEther(offeramount), 0, 0, gettoken, ethers.utils.parseEther(getamount), 0, 0],
                })
                const tx = await writeContract(config3)
                await tx.wait()
                setDealupdate(tx.hash)
            } else {
                const config3 = await prepareWriteContract({
                    address: p2pcall,
                    abi: p2pcallABI,
                    functionName: 'callOfferDeal',
                    args: [false, target, 0, 0, offernft, offerid, gettoken, ethers.utils.parseEther(getamount), 0, 0],
                })
                const tx = await writeContract(config3)
                await tx.wait()
                setDealupdate(tx.hash)
            }
        } catch (e) {
            setDealerror(e.message.slice(0, 175))
        }
    }

    React.useEffect(() => {
        const thefetch = async () => {
            let offerBal = 0
            if (offertoken === 1) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: cmjtoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 2) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: jusdttoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10001) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: woodtoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10002) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: tunatoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10003) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: micetoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10004) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: coppertoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10005) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: jaspertoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (offertoken === 10006) {
                offerBal = address !== null && address !== undefined ? await readContract({
                    address: jdaotoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            }

            let getBal = 0
            if (gettoken === 1) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: cmjtoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 2) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: jusdttoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10001) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: woodtoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10002) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: tunatoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10003) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: micetoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10004) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: coppertoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10005) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: jaspertoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            } else if (gettoken === 10006) {
                getBal = address !== null && address !== undefined ? await readContract({
                    address: jdaotoken,
                    abi: kap20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                }) : 0
            }

            return [
                offerBal, getBal
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
            setOfferbalance(ethers.utils.formatEther(result[0]))
            setGetbalance(ethers.utils.formatEther(result[1]))
        })
    }, [address, offertoken, gettoken])

    useContractEvent({
        address: p2pcore,
        abi: p2pcoreABI,
        eventName: 'OfferDeal',
        listener(sender, receiver, callIndex, dealIndex) {
            if (sender.toUpperCase() === address.toUpperCase() && receiver.toUpperCase() === target.toUpperCase() && dealno === 0) {
                setDealno(Number(dealIndex))
            }
        },
        chainId: 8899,
    })


    return (
        <div className="Dealcard">
            <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                <div className="bold">P2P Trade</div>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch />}
                        label={<div style={{fontSize: "12px"}} className="bold">NFT OFFER</div>}
                        labelPlacement="start"
                        checked={checked}
                        onChange={() => console.log('handleOffermode')}
                    />
                </FormGroup>
            </div>
            <div style={{height: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                {checked === false ?
                    <div style={{height: "120px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <Offertoken offertoken={offertoken} setOffertoken={setOffertoken} gettoken={gettoken} />
                        {offerbalance !== null ?
                            <div style={{width: "100%", fontSize: "12px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}} className="bold">
                                <div style={{color: "#5f6476"}}>BALANCE</div>
                                <div>{offerbalance}</div>
                            </div> :
                            <></>
                        }
                        <input placeholder="Offer token amount (to send)" value={offeramount} onChange={handleOffer}></input>
                    </div> :
                    <div style={{width: "100%", height: "120px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <Offernft setOffernft={setOffernft} setOfferid={setOfferid} setOffername={setOffername} setOffersrc={setOffersrc} />
                        {offernft === null ?
                            <div style={{width: "100%", height: "80px", fontSize: "12px", letterSpacing: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="bold">
                                <div style={{width: "75px", height: "75px", background: "rgb(19, 26, 42)"}}></div>
                                <div style={{marginLeft: "20px", color: "rgb(95, 100, 118)"}}>Please select NFTs to offer.</div>
                            </div> :
                            <div style={{width: "100%", height: "80px", fontSize: "12px", letterSpacing: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="bold">
                                <img
                                    src={offersrc}
                                    width="75"
                                    alt="nftpic"
                                />
                                <div style={{marginLeft: "20px", display: "flex", flexDirection: "column"}}>
                                    <div>{offername}</div>
                                    <div style={{color: "rgb(95, 100, 118)"}}>NFT id: {offerid}</div>
                                </div>
                            </div>
                        }
                    </div>
                }
                <Gettoken gettoken={gettoken} setGettoken={setGettoken} offertoken={offertoken} />
                {getbalance !== null ?
                    <div style={{width: "100%", fontSize: "12px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}} className="bold">
                        <div style={{color: "#5f6476"}}>BALANCE</div>
                        <div>{getbalance}</div>
                    </div> :
                    <></>
                }
                <input placeholder="Get token amount (to receive)" value={getamount} onChange={handleGet}></input>
                <Offerbook setTarget={setTarget} setAddr={setAddr} />
                <input placeholder="Enter 0x..." onChange={handleTarget} value={addr}></input>
                <div style={{width: "100%", marginTop: "10px", fontSize: "12px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}} className="bold">
                    <div style={{color: "#5f6476"}}>SECURITY FEE [2.5%]</div>
                    <div>{offerfee !== 0 ? offerfee.toFixed(8) : "0.00000000"} {offertoken === 1 || (gettoken === 1 && offertoken !== 2) ? 'CMJ' : ''}{offertoken === 2 || (gettoken === 2 && offertoken !== 1) ? 'JUSDT' : ''}</div>
                </div>
            </div>
            <Button
                sx={{width: "300px", padding: "10px 40px", borderRadius: "10px", fontFamily: "Inter-ExtraBold", fontSize: "16px"}}
                variant="contained"
                disabled=
                    {chain !== undefined && chain.id === 8899 && ((offernft !== null && offerid !== null) || (Number(offeramount) > 0 && ((offertoken >= 10001 && Number(offeramount) <= Number(offerbalance) && Number(getbalance) >= Number(offerfee)) || (offertoken <= 10000 && Number(offeramount) <= Number(offerbalance) - Number(offerfee))))) && Number(getamount) > 0 && target !== "" ?
                        false :
                        true
                    }
                onClick={offerDeal}
            >
                OFFER DEAL
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {dealerror === null ? 
                        <>
                            {dealupdate === null || dealno === 0 ? 
                                <>
                                    <CircularProgress size="14px" />
                                    &nbsp;&nbsp;Transaction is pending
                                </> : 
                                <>
                                    <div style={{width: "fit-content", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <SendIcon size="14px" />
                                        <div style={{marginLeft: "10px"}}>Deal#{dealno} has offered</div>
                                    </div>
                                    <br></br><Button onClick={() => {setOpen(false); setDealnum(dealno); setIsdealsuccess(null); navigate("/deal/" + dealno);}}>Go to deal page</Button>
                                    <br></br><Button href={"https://exp-l1.jibchain.net/tx/" + dealupdate} target="_blank" rel="noopener">View transaction on block explorer</Button>
                                    <br></br><Button onClick={() => setOpen(false)}>Close</Button>
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
    )
}

export default Offerwindow