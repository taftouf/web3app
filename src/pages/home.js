
import { useSelector } from "react-redux"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from "react-redux";
import { changeAddress } from "../features/account/accountSlice";
import { useState } from "react";

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const Home = ()=>{
    const dispatch = useDispatch();
    const address = useSelector((state)=>state.account.address);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const Logout = async()=>{
        await dispatch(changeAddress(""));
    };

    const handleClose = async() => {
        // Fix
        Logout();
        setOpen(false);
    };
    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                <Typography variant="h6" noWrap component="div" style={{ flex: 1 }}>
                    XPay
                </Typography>
                <Box>
                    <Button onClick={handleClickOpen} id="addressButton">
                        {
                            String(address).substring(0, 6) +
                            "..." +
                            String(address).substring(38)
                        }
                    </Button>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Identity"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText sx={{border:"1px solid #000"}} id="alert-dialog-slide-description">
                            {address}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button startIcon={<LogoutIcon />} onClick={handleClose}>Log Out</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                
            </Box>
        </Box>
        
    )
}