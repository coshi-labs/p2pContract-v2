import React from 'react'
import { useAccount } from 'wagmi'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'
import GradientIcon from '@mui/icons-material/Gradient'

const jibjibNft = "0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251"
const colNft = [null, jibjibNft, null]

const style = { height: "90vh", overflow: "scroll", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, letterSpacing: 1, }

const Offernft = ({ setOffernft, setOfferid, setOffername, setOffersrc }) => {
    const { address } = useAccount()

    const [col, setCol] = React.useState(1)
    const [nft, setNft] = React.useState([])

    const loadnft = async (_col) => {
        setNft([])
        setCol(_col)

        let nfts = []
        const res = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: `{
                    account(id: "` + address + `") {
                        ERC721tokens(where: {contract: "` + jibjibNft + `"}, first: 1000) {
                            id
                            uri
                        }
                    }
                }`
            })
        })).json() : null
        const _res = res !== null && res.data.account !== null ? res.data.account.ERC721tokens : []

        for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined; i++) {
            const nftid = Number((_res[i].id).slice(43))

            let bonus;
            if (nftid >= 61) {
                bonus = 2;
            } else if (nftid >= 31 && nftid <= 59) {
                bonus = 5;
            } else if (nftid >= 11 && nftid <= 29) {
                bonus = 10;
            } else if (nftid <= 10) {
                bonus = 25;
            }

            nfts.push({
                Col: 1,
                Id: nftid,
                Name: "CM Hexa Cat Meaw JIB JIB #" + nftid,
                Image: "https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/" + nftid + ".png/",
                Attribute: [{Bonus: bonus}],
            })
        }
        if (nfts.length === 0) { nfts.push(null) }


        setNft(nfts.sort(function (a, b) {
            if (a.Name < b.Name) {
                return -1
            }
            if (a.Name > b.Name) {
                return 1
            }
            return 0
        }))
    }

    React.useEffect(() => {
        setOffernft(null)
        setOfferid(null)
        setOffername(null)
        setOffersrc(null)
        loadnft(col)
    }, [address]) // eslint-disable-line

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        loadnft(1)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)
    const handleSelect = (_offer) => {
        setOffernft(_offer[0])
        setOfferid(_offer[1])
        setOffername(_offer[2])
        setOffersrc(_offer[3])
        handleClose()
    }
    
    return (
        <>
            <Button sx={{fontFamily: "Inter-ExtraBold", fontSize: "14px"}} onClick={handleOpen}>
                <GradientIcon color="primary" />
                &nbsp;&nbsp;Select NFT
            </Button>   
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="Nftmodal" sx={style}>
                    <div style={{width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                        <Button variant="outlined" onClick={() => {loadnft(1);}}>CMHEXA JIB JIB</Button>
                        <Button variant="outlined" onClick={() => {loadnft(2);}}>COMING SOON</Button>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "Inter-ExtraBold", mt: 2 }}>
                        {col === 1 ? "CMHEXA JIB JIB" : <></>}
                        {col === 2 ? "COMING SOON" : <></>}
                        <Divider />
                    </Typography>
                    <div style={{marginTop: "10px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap"}}>
                        {nft.map((item, index) => (
                            <Button 
                                key={index}
                                sx={{ mt: 2, width: "250px", minHeight: "340px", padding: 2, margin: "5px", border: "1px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}
                                onClick={() => handleSelect([item.Col, item.Id, item.Name, item.Image])}
                            >
                                <div>
                                    <img
                                        src={item.Image}
                                        width="130"
                                        alt="nftpic"
                                    />
                                    <div style={{width: "200px", marginTop: "10px"}}>{item.Name}</div>
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    {item.Attribute.map((attr, index) => (
                                        <div key={index} style={{width: "200px", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "10px", color: "rgb(95, 100, 118)"}}>
                                            <div className="attr">{attr.trait_type}</div>
                                            <div className="attr">{String(attr.value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </Button>
                        ))}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Offernft