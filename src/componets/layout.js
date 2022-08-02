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
import { changeAddress, changeWallet } from "../features/account/accountSlice";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";

import MenuIcon from '@mui/icons-material/Menu';
import SideBarListItem from "./sideBarListItem";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const Layout = ()=>{
    const dispatch = useDispatch();
    const address = useSelector((state)=>state.account.address);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
        ) {
        return;
        }
        setState(open);
    };

    const list = () => (
        <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
            <SideBarListItem />
        </Box>
    );

    return(
        <Box sx={{ display: 'flex', height:"100%" }}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                sx={{ 
                    [theme.breakpoints.up('md')]: {
                        zIndex: (theme) => theme.zIndex.drawer + 1 ,
                    },
                    background: 'linear-gradient(45deg, #0da6f0 30%, #86E4F7 100%)',
                    color:'#434343'
                }}>
                <Toolbar>
                <Typography variant="h6" noWrap component="div" style={{ flex: 1,fontWeight: 'bold' }}>
                    Abierto
                </Typography>
                <Box>
                    <React.Fragment>
                        <Button
                            id="menuButton"
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    display: 'none',
                                },
                            }}
                            onClick={toggleDrawer(true)}
                        ><MenuIcon /></Button>
                        <SwipeableDrawer
                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        >
                        {list()}
                        </SwipeableDrawer>
                    </React.Fragment>
                    
                    <Button onClick={()=>{ setOpen(true);}} id="addressButton">
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
                        onClose={()=>{setOpen(false)}}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Identity"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {address}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button startIcon={<LogoutIcon />} onClick={async()=>{setOpen(false);await dispatch(changeAddress(""));await dispatch(changeWallet(""));}}>Log Out</Button>
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
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', border:0,  background: 'white', color: '#404040' },
                    [theme.breakpoints.down('md')]: {
                        display: 'none',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{mb:4, mt:4, ml:2}}>
                    <SideBarListItem />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, height:"100%",background: '#E6F9FD'}}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
        
    )
}