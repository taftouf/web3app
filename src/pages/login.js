import { Grid, Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { changeAddress, changeWallet, connection } from "../features/account/accountSlice";
import React from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import connector from '../providers';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();


    connector.on("connect", async(error, payload) => {
      if (error) {
        throw error;
      }
    
      // Close QR Code Modal
      WalletConnectQRCodeModal.close(
        true // isNode = true
      );
      console.log(connector.accounts[0]);
      await dispatch(changeAddress(connector.accounts[0]));
      await dispatch(changeWallet(1));
      navigate("home");    
    });

    const _walletConnect = async()=>{
      if (!connector.connected) {
        // create new session
        connector.createSession().then(() => {
          // get uri for QR Code modal
          const uri = connector.uri;
          // display QR Code modal
          WalletConnectQRCodeModal.open(
            uri,
            () => {
              console.log("QR Code Modal closed");
            },
            true // isNode = true
          );
        });
      }else{
        console.log(connector.accounts[0]);
        await dispatch(changeAddress(connector.accounts[0]));
        await dispatch(changeWallet(1));
        navigate("home");
      }
    }


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
                sx={{width:"200px",borderRadius:"16px", border:"1px solid #ecf2f8",bgcolor:"white",color:"black"}}
                onClick={handleOpen}> Wallet Login </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        {window.ethereum?
                            <Button
                            sx={{bgcolor:"white", color:"black"}}
                            id="walletButton"
                            variant="contained"
                            onClick={async()=>{await dispatch(connection())}}
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
                         onClick={_walletConnect}
                        >
                            WalletConnect
                        </Button>
                    </Box>
                    
                </Box>
            </Modal>
        </Grid>
    );
}