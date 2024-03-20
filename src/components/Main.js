import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Navbar from './Navbar.js'
import Offerwindow from './Offerwindow.js'
import Dealwait from './Dealwait.js'
import Dealsuccess from './Dealsuccess.js'
import Yourcard from './Yourcard.js'
import Peercard from './Peercard.js'

import p2pcoreABI from '../ABI/p2pcoreABI.json'
import kap20ABI from '../ABI/kap20ABI.json'
import kap721ABI from '../ABI/kap721ABI.json'

const p2pcore = "0x0bC24195a7aF3d92A6590dAB77aD7b3d63e0d83c" 

const woodtoken = "0xc2744Ff255518a736505cF9aC1996D9adDec69Bd"
const tunatoken = "0x09676315DC0c85F6bd5e866C5f1363A00Eec4381"
const micetoken = "0x09DE640ecd50e1c81bCB266279e3ffC2719873df"
const coppertoken = "0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841"
const jaspertoken = "0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860"
const jdaotoken = "0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88"
const cmjtoken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const jusdttoken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"

const jibjibNft = "0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251"
const colNft = [null, jibjibNft, null]

const darkTheme = createTheme({ palette: { mode: 'dark', }, })
   
const Main = () => {
    const { address } = useAccount()
    const navigate = useNavigate()
    const { modeText, subModeText } = useParams()

    let _dealnum = null
    if (modeText !== undefined) {
        if (modeText.toUpperCase() === "DEAL") {
            if (subModeText !== undefined) {
                document.title = "DEAL#" + subModeText + " | p2pContract v2"
                _dealnum = subModeText
            } else {
                document.title = "404 | p2pContract v2"
            }
        } else {
            document.title = "404 | p2pContract v2"
        }
    } else {
        document.title = "p2pContract v2"
    }

    const [target, setTarget] = React.useState("")
    const [dealnum, setDealnum] = React.useState(_dealnum)
    const [dealupdate, setDealupdate] = React.useState(null)

    const [offer, setOffer] = React.useState(null)
    const [get, setGet] = React.useState(null)
    const [fee, setFee] = React.useState(null)
    const [sendtoken, setSendtoken] = React.useState(null)
    const [sendamount, setSendamount] = React.useState(null)
    const [sendbalance, setSendbalance] = React.useState(null)
    const [feetoken, setFeetoken] = React.useState(null)
    const [feeamount, setFeeamount] = React.useState(null)
    const [feebalance, setFeebalance] = React.useState(null)
    const [sender, setSender] = React.useState(null)
    const [receiver, setReceiver] = React.useState(null)
    const [isdealsuccess, setIsdealsuccess] = React.useState(null)
    const [timetoReject, setTimetoReject] = React.useState(null)

    React.useEffect(() => {
        setIsdealsuccess(null)

        const thefetch = async () => {
            const dealdata = dealnum !== null ? await readContract({
                address: p2pcore,
                abi: p2pcoreABI,
                functionName: 'getDeal',
                args: [dealnum],
            }) : null

            let offer = null
            let get = null
            let fee = null
            let sendToken = 0
            let sendAmount = 0
            let sendBal = 0
            let feeToken = 0
            let feeAmount = 0
            let feeBal = 0
            let senDer = ""
            let receiVer = ""
            let dealstatus = null
            let nextWeektoReject = 0
            if (dealdata !== null && address !== null & address !== undefined) {
                if (dealdata.sender !== "0x0000000000000000000000000000000000000000") {
                    if (Number(dealdata.offerTokenIndex) === 1) {
                        offer = <><img src='https://commudao.cmhexa.com/tokens/cmj.png' width='20px' alt='cmj'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} CMJ</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: cmjtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 2) {
                        offer = <><img src='https://commudao.cmhexa.com/tokens/jusdt.png' width='20px' alt='jusdt'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} JUSDT</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jusdttoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10001) {
                        offer = <><img src='https://commudao.cmhexa.com/items/wood.png' width='20px' alt='wood'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} WOOD</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: woodtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10002) {
                        offer = <><img src='https://commudao.cmhexa.com/items/tuna.png' width='20px' alt='tuna'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} TUNA</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: tunatoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10003) {
                        offer = <><img src='https://commudao.cmhexa.com/items/mice.png' width='20px' alt='mice'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} MICE</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: micetoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10004) {
                        offer = <><img src='https://commudao.cmhexa.com/items/copper.png' width='20px' alt='copper'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} COPPER</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: coppertoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10005) {
                        offer = <><img src='https://commudao.cmhexa.com/items/jasper.png' width='20px' alt='jasper'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} JASPER</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jaspertoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerTokenIndex) === 10006) {
                        offer = <><img src='https://commudao.cmhexa.com/tokens/jdao.png' width='20px' alt='jdao'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.offerTokenAmount)} JDAO</>
                        sendBal = dealdata.sender.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jdaotoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.offerNftIndex) > 0) {
                        const nftipfs = await readContract({
                            address: colNft[Number(dealdata.offerNftIndex)],
                            abi: kap721ABI,
                            functionName: 'tokenURI',
                            args: [dealdata.offerNftId],
                        })
                        const response = await fetch(nftipfs)
                        const json = await response.json()
                        offer = <div style={{width: "290px", fontSize: "12px", letterSpacing: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="bold">
                                <img src={json.image} width='100px' alt='nftpic'></img>
                                <div style={{marginLeft: "20px", display: "flex", flexDirection: "column"}}>
                                    <div>{json.name}</div>
                                    <div style={{color: "rgb(95, 100, 118)"}}>NFT id: {Number(dealdata.offerNftId)}</div>
                                </div>
                            </div>
                    }

                    if (Number(dealdata.getTokenIndex) === 1) {
                        get = <><img src='https://commudao.cmhexa.com/tokens/cmj.png' width='20px' alt='cmj'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} CMJ</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 1 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: cmjtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 2) {
                        get = <><img src='https://commudao.cmhexa.com/tokens/jusdt.png' width='20px' alt='jusdt'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} JUSDT</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 2 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jusdttoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10001) {
                        get = <><img src='https://commudao.cmhexa.com/items/wood.png' width='20px' alt='wood'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} WOOD</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10001 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: woodtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10002) {
                        get = <><img src='https://commudao.cmhexa.com/items/tuna.png' width='20px' alt='tuna'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} TUNA</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10002 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: tunatoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10003) {
                        get = <><img src='https://commudao.cmhexa.com/items/mice.png' width='20px' alt='mice'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} MICE</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10003 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: micetoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10004) {
                        get = <><img src='https://commudao.cmhexa.com/items/copper.png' width='20px' alt='copper'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} COPPER</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10004 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: coppertoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10005) {
                        get = <><img src='https://commudao.cmhexa.com/items/jasper.png' width='20px' alt='jasper'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} JASPER</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10005 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jaspertoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    } else if (Number(dealdata.getTokenIndex) === 10006) {
                        get = <><img src='https://commudao.cmhexa.com/tokens/jdao.png' width='20px' alt='jdao'></img>&nbsp;&nbsp;{ethers.utils.formatEther(dealdata.getTokenAmount)} JDAO</>
                        sendToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 10006 : 0
                        sendAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) : 0
                        sendBal = dealdata.receiver.toUpperCase() === address.toUpperCase() ? await readContract({
                            address: jdaotoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }) : 0
                    }

                    if ((Number(dealdata.offerTokenIndex) >= 10000 || Number(dealdata.offerNftIndex) > 0) && Number(dealdata.getTokenIndex) === 1) {
                        fee = <><img src='https://commudao.cmhexa.com/tokens/cmj.png' width='20px' alt='cmj'></img>&nbsp;&nbsp;{(ethers.utils.formatEther(dealdata.getTokenAmount) * 0.025).toFixed(8)} CMJ</>
                        feeToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 1 : 0
                        feeAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) * 0.025 : 0
                        feeBal = await readContract({
                            address: cmjtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        })
                    } else if ((Number(dealdata.offerTokenIndex) >= 10000 || Number(dealdata.offerNftIndex) > 0) && Number(dealdata.getTokenIndex) === 2) {
                        fee = <><img src='https://commudao.cmhexa.com/tokens/jusdt.png' width='20px' alt='jusdt'></img>&nbsp;&nbsp;{(ethers.utils.formatEther(dealdata.getTokenAmount) * 0.025).toFixed(8)} JUSDT</>
                        feeToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 2 : 0
                        feeAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.getTokenAmount) * 0.025 : 0
                        feeBal = await readContract({
                            address: jusdttoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        })
                    } else if (Number(dealdata.offerTokenIndex) === 1) {
                        fee = <><img src='https://commudao.cmhexa.com/tokens/cmj.png' width='20px' alt='cmj'></img>&nbsp;&nbsp;{(ethers.utils.formatEther(dealdata.offerTokenAmount) * 0.025).toFixed(8)} CMJ</>
                        feeToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 1 : 0
                        feeAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.offerTokenAmount) * 0.025 : 0
                        feeBal = await readContract({
                            address: cmjtoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        })
                    } else if (Number(dealdata.offerTokenIndex) === 2) {
                        fee = <><img src='https://commudao.cmhexa.com/tokens/jusdt.png' width='20px' alt='jusdt'></img>&nbsp;&nbsp;{(ethers.utils.formatEther(dealdata.offerTokenAmount) * 0.025).toFixed(8)} JUSDT</>
                        feeToken = dealdata.receiver.toUpperCase() === address.toUpperCase() ? 2 : 0
                        feeAmount = dealdata.receiver.toUpperCase() === address.toUpperCase() ? ethers.utils.formatEther(dealdata.offerTokenAmount) * 0.025 : 0
                        feeBal = await readContract({
                            address: jusdttoken,
                            abi: kap20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        })
                    }

                    senDer = dealdata.sender
                    receiVer = dealdata.receiver
                    dealstatus = dealdata.status

                    nextWeektoReject = dealdata.receiver.toUpperCase() === address.toUpperCase() && dealdata.sender.toUpperCase() !== address.toUpperCase() ?
                        new Date((Number(dealdata.offerTime) * 1000) + (604800 * 1000)) :
                        0
                } else {
                    dealstatus = false
                }
            } else {
                dealstatus = false
            }

            return [
                offer, get, fee,
                sendToken, sendAmount, sendBal, feeToken, feeAmount, feeBal,
                senDer, receiVer, dealstatus, nextWeektoReject,
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
            setOffer(result[0])
            setGet(result[1])
            setFee(result[2])
            setSendtoken(result[3])
            setSendamount(result[4])
            setSendbalance(ethers.utils.formatEther(result[5]))
            setFeetoken(result[6])
            setFeeamount(result[7])
            setFeebalance(ethers.utils.formatEther(result[8]))
            setSender(result[9])
            setReceiver(result[10])
            if (address !== null && address !== undefined) {
                result[9].toUpperCase() === address.toUpperCase() ? setTarget(result[10]) : setTarget(result[9])
            }
            setIsdealsuccess(result[11])
            Date.now() <= result[12] ?
                setTimetoReject(result[12].toLocaleString('es-CL')) :
                setTimetoReject(0)
        })
    }, [address, dealnum])


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Navbar
                setDealnum={setDealnum}
                setIsdealsuccess={setIsdealsuccess}
                dealupdate={dealupdate}
                setTarget={setTarget}
                navigate={navigate} 
            />
            <div className="Main">
                <div className="Container">
                    <Yourcard />
                    {dealnum !== null ?
                        <> 
                            {isdealsuccess !== null ?
                                <>
                                    {isdealsuccess === false ?
                                        <Dealwait
                                            offer={offer}
                                            get={get}
                                            fee={fee}
                                            sendtoken={sendtoken}
                                            sendamount={sendamount}
                                            sendbalance={sendbalance}
                                            feetoken={feetoken}
                                            feeamount={feeamount}
                                            feebalance={feebalance}
                                            sender={sender}
                                            receiver={receiver}
                                            timetoReject={timetoReject}
                                            dealnum={dealnum}
                                            setDealnum={setDealnum}
                                            dealupdate={dealupdate}
                                            setDealupdate={setDealupdate}
                                            setTarget={setTarget}
                                            navigate={navigate}
                                        /> :
                                        <Dealsuccess
                                            offer={offer}
                                            get={get}
                                            fee={fee}
                                            sender={sender}
                                            receiver={receiver}
                                            dealnum={dealnum}
                                        />
                                    }
                                </> :
                                <div className="Dealcard">
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                                        DEAL #{dealnum}
                                    </div>
                                </div>
                            }
                        </> :
                        <Offerwindow
                            target={target}
                            setTarget={setTarget}
                            setDealnum={setDealnum}
                            dealupdate={dealupdate}
                            setDealupdate={setDealupdate}
                            setIsdealsuccess={setIsdealsuccess}
                            navigate={navigate}
                        />
                    }
                    <Peercard target={target} />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Main