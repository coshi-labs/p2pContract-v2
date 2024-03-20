import React from 'react'
import { useAccount } from 'wagmi'

import DoneAllIcon from '@mui/icons-material/DoneAll'
import Divider from '@mui/material/Divider'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
   
const Dealsuccess = ({ offer, get, fee, sender, receiver, dealnum }) => {
    const { address } = useAccount()

    return (
        <div className="Dealcard">
            {sender !== null && sender !== "" && sender !== "0x0000000000000000000000000000000000000000" && address !== undefined && address !== null ?
                <>
                    {sender.toUpperCase() === address.toUpperCase() || receiver.toUpperCase() === address.toUpperCase() ?
                        <>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                                DEAL #{dealnum}&nbsp;&nbsp;
                                <DoneAllIcon color="primary" />
                            </div>
                            <Divider />
                            <div style={{height: "60%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", fontFamily: "Inter-ExtraBold", fontSize: "14px"}}>
                                <div style={{color: "#5f6476"}}>YOU GOT</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {sender.toUpperCase() === address.toUpperCase() ? get : offer}
                                </div>
                                <Divider />
                                <div style={{color: "#5f6476"}}>PEER GOT</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {sender.toUpperCase() === address.toUpperCase() ? offer : get}
                                </div>                                    
                                <Divider />
                                <div style={{color: "#5f6476"}}>SECURITY FEE [2.5% EACH SIDE]</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {fee}
                                </div>
                            </div>
                            <Divider />
                            <div style={{height: "20%"}}></div>
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

export default Dealsuccess