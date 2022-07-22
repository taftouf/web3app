import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { theme } from '../componets/theme';
import Button from '@mui/material/Button';
import { CopyBlock, dracula } from "react-code-blocks";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const responsivePaper = {
    mt:3,
    width: "100%",
};

const deleteButton = {
    mt: theme.spacing(3),
    padding: 1.8,
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    "&:hover":{
        background: 'red',
        color: "white"
    },
    cursor: 'pointer'
}

const header = {
    ml: theme.spacing(2),
    mt:theme.spacing(2),
    background: 'linear-gradient(45deg, #b5b3b3 5%, #ecf2f8 100%)',
    color: 'black',
    padding: 1.5,
    width: '100%',
    borderRadius: 1,
    border: '0',
    textAlign: 'left',
    fontWeight: 'bold'
}

export const IntegrationDetails = ()=>{
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const [name, setName] = useState("");
    const [receiver, setReceiver] = useState("");
    const [key, setKey] = useState("");
    const id = location.state.integration._id.$oid;
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);    
    const [del, setDelete] = useState("");
    const navigate = useNavigate();

    const requestOptions = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json' ,
            'Accept': 'application/json',
            'Authorization': token,
            '_id': id
        }
    };

    const jsx = `
        const tokens = [
                {address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709", symbol: "Link", decimal: "18",amount: "1"},
                ...
            ]
            ...
        <Button 
            key="`+key+`"
            label="Pay With Crypto"
            amount="0.001" 
            receiver="0xfe1167Cb42d0a06f0C2c64d4fE2708e12328e22E" 
            tokens = {tokens}
            setResponse= {setResponse}
            succesModal = {true}
        />
    `

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

    const dele = async()=>{
        if(del === name){
            const requestOptions = {
                method: 'delete',
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Accept': 'application/json',
                    'Authorization': token,
                    '_id': id
                }
            };
            await fetch('http://127.0.0.1:8000/api/integration/'+id+'/delete', requestOptions)
            .then(response => response.json())
            .then(data => { navigate('/integrations')});
        }
    }

    useEffect(()=>{
        const get = async() => {
            await fetch('http://127.0.0.1:8000/api/integration/'+id, requestOptions)
           .then(res => res.json())
           .then(data => {setName(data['integration'][0]?.name); setReceiver(data['integration'][0]?.receiver); setKey(data['integration'][0]?.key)})
           .catch(err => {
             console.log("error");
           });
       };
       get();
    },[])

    const get = async()=>{
        console.log(location.state.integration._id.$oid);
        const requestOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                '_id': id
            }
        };
        await fetch('http://127.0.0.1:8000/api/integration/'+id, requestOptions)
        .then(response => response.json())
        .then();
    }

    return(
        <>
             <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{md:3 }}>
                    <Grid item xs={isSmall ? 12 : 6}>
                    <Item>
                        <Card elevation={4} sx={{ background: '#ecf2f8', mt: 2}}>
                            <CardContent>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Name" 
                                    variant="outlined"
                                    sx={responsivePaper}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        update();
                                    }}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Receiving Wallet" 
                                    variant="outlined"
                                    sx={responsivePaper}
                                    value={receiver}
                                    onChange={(e) => {
                                        setReceiver(e.target.value);
                                        update();
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Item>
                    </Grid>

                    <Grid item xs={isSmall ? 12 : 6}>
                    <Item>
                        <Card elevation={4} sx={{ background: '#ecf2f8', mt: 2}}>
                            <CardContent>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Name of Integration" 
                                    variant="outlined"
                                    sx={responsivePaper}
                                    onChange={(e) => {
                                        setDelete(e.target.value);
                                    }}
                                />
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    sx={deleteButton}
                                    onClick={()=>{dele()}}
                                    >Delete Integration</Button>
                            </CardContent>
                        </Card>
                    </Item>
                    </Grid>
                    <Grid item xs={12}>
                    <Item>
                        <Card elevation={4} sx={{ background: '#ecf2f8', mt: 2}}>
                            <CardContent>
                                <Box sx={header} >Installation</Box>
                                <Box component="div" sx={{mb:1, ml:1, p:1}}>
                                    <CopyBlock
                                            language="bash"
                                            text={`npm i web3-component-test`}
                                            codeBlock
                                            theme={dracula}
                                            showLineNumbers={false}
                                            />
                                </Box>

                                <Box sx={header}>Integration</Box>
                                <Box component="div" sx={{mb:1, ml:1, p:1}}>
                                    <CopyBlock
                                        language="go"
                                        text={jsx}
                                        codeBlock
                                        theme={dracula}
                                        showLineNumbers={false}
                                        />
                                </Box>
                            </CardContent>
                        </Card>
                    </Item>
                    </Grid>
                </Grid>
            </Box>   
        </>
    )
}