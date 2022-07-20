import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { theme } from '../componets/theme';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const responsivePaper = {
    mt:3,
    width: "60%",
    [theme.breakpoints.down('md')]: {
        width: "100%",
    }
};

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      background: 'linear-gradient(45deg, #dbdbdb 30%, #b5b3b3 90%)',
      color: 'black',
      [theme.breakpoints.down("sm")]: {
        minWidth: 32,
        paddingLeft: 8,
        paddingRight: 8,
        "& .MuiButton-startIcon": {
          margin: 0
        },
      },
      "&:hover":{
        background: 'white'
       }
    }
}))

export const IntegrationDetails = ()=>{
    const classes = useStyles();
    const location = useLocation();
    const [name, setName] = useState(location.state.integration.name);
    const [receiver, setReceiver] = useState(location.state.integration.receiver);
    const id = location.state.integration._id.$oid;
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);    

    const update = async()=>{
        const requestOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'receiver': receiver,
                'name': name,
                '_id': id
            }
        };
        await fetch('http://127.0.0.1:8000/api/integration/'+id+'/update', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    useEffect(()=>{
       update();
    },[name, receiver])
    return(
        <>
             <Card sx={{ minWidth: 275 , background: '#ecf2f8'}}>
                <CardContent>

                <Box
                    component="form"
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            mt:1,
                            pt:1,
                            ml:1,
                            pl:1
                        }
                       
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined"
                        sx={responsivePaper}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                         />
                </Box>
                <Box
                    component="form"
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            m:1,
                            p:1
                        }
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField 
                        id="outlined-basic" 
                        label="Receiving Wallet" 
                        variant="outlined"
                        sx={responsivePaper}
                        value={receiver}
                        onChange={(e) => {
                            setReceiver(e.target.value);
                        }}
                         />
                </Box>

                </CardContent>
                <CardActions>
                   
                </CardActions>
            </Card>
        </>
    )
}