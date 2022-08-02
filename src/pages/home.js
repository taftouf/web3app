import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState ,useEffect} from 'react';
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export const Home=()=>{
    const [nbrTransaction, setNbrTransaction] = useState(0);
    const [nbrTokens, setNbrTokens] = useState();
    const [tokens, setTokens] = useState([]);
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    const [nbrSuccess, setNbrSucces] = useState(0);
    const [nbrFailed, setNbrFailed] = useState(0);
    
    const getNbrTransaction = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/payments/owner', requestOptions)
        .then(response => response.json())
        .then(data => {
            setNbrTransaction(data.nbr);
        })
        .catch(err => {
            console.log("error test");
        });
    }

    const getTokens = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/tokenIn/owner', requestOptions)
        .then(response => response.json())
        .then(data => {
            setNbrTokens(data.nbrTokenIn);
            setTokens(data.token);
        })
        .catch(err => {
            console.log("error test");
        });
    }

    const getSuccessTransaction = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/payments/success', requestOptions)
        .then(response => response.json())
        .then(data => {
            setNbrSucces(data.nbr);
        })
        .catch(err => {
            console.log("error test");
        });
    }

    const getFailedTransaction = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/payments/failed', requestOptions)
        .then(response => response.json())
        .then(data => {
            setNbrFailed(data.nbr);
        })
        .catch(err => {
            ("error test");
        });
    }



    useEffect(()=>{
        getNbrTransaction();
        getSuccessTransaction();
        getFailedTransaction();
        getTokens();
        console.log(tokens);
    }, [])
    return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
            <Grid item xs>
                <Item>
                    <div> Orders </div>
                    <div>{nbrTransaction}</div>
                </Item>
            </Grid>
            <Grid item xs>
                <Item>
                    <div> Succes </div>
                    <div> {nbrSuccess} </div>
                </Item>
            </Grid>
            <Grid item xs>
                <Item>
                    <div> Failed </div>
                    <div> {nbrFailed} </div>
                </Item>
            </Grid>
            </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 ,mt:5}}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Item>
                      
                    </Item>
                </Grid>
                <Grid item xs>
                    <Item>
                        <div> Token </div>
                        <div> {nbrTokens} </div>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    </>
    )
}
