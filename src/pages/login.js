import { Grid, Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { connection } from "../features/account/accountSlice";
import React from "react";
import { useState } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '0px',
    borderRadius: '0px',
    boxShadow: 24,
    p: 1,
  };
export const Login = ()=>{
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Button
                startIcon={<AccountBalanceWalletIcon />}
                sx={{width:"200px",borderRadius:"16px", border:"1px solid #000"}}
                onClick={handleOpen}> Wallet Login </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Wallet
                    </Typography> */}
                    <Box>
                        {window.ethereum?
                            <Button
                            sx={{bgcolor:"white", color:"black"}}
                            id="walletButton"
                            variant="contained"
                            onClick={async()=>{await dispatch(connection(0))}}
                            > Metamask </Button>
                            :
                            <Button 
                            sx={{bgcolor:"white", color:"black"}}
                            id="walletButton"
                            variant="contained"
                            onClick={() => { window.open('https://metamask.io/download.html', '_blank') }}
                            >
                                Install Metamask     
                            </Button>
                        }
                    </Box>
                    <Box>
                        <Button
                        sx={{bgcolor:"white", color:"black"}}
                         id="walletButton"
                         variant="contained" 
                         onClick={async()=>{await dispatch(connection(1))}}
                        >
                            WalletConnect
                        </Button>
                    </Box>
                    
                </Box>
            </Modal>
        </Grid>
    );
}