import React from 'react'
import { useAccount } from 'wagmi'

import Notification from './Notification.js'
import History from './History.js'
import Wallet from './Wallet.js'
   
const Navbar = ({ setDealnum, setIsdealsuccess, dealupdate, setTarget, navigate }) => {
    const { address } = useAccount()

    return (
        <div className="Navbar">
            <div className="Mainlogo" onClick={() => {setDealnum(null); setTarget(""); navigate("/");}}>p2pContract v2</div>
            <div className="Menuright">
                {address !== undefined && address !== null ?
                    <>
                        <Notification setDealnum={setDealnum} setIsdealsuccess={setIsdealsuccess} dealupdate={dealupdate} setTarget={setTarget} navigate={navigate} />
                        <History setDealnum={setDealnum} setIsdealsuccess={setIsdealsuccess} dealupdate={dealupdate} setTarget={setTarget} navigate={navigate} />
                    </> :
                    <></>
                }
                <Wallet />
            </div>
        </div>
    )
}

export default Navbar