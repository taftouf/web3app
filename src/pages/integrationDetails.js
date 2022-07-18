import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';


export const IntegrationDetails = ()=>{
    const location = useLocation();

    useEffect(()=>{
        console.log(location.state.integration);
    })
    return(
        <>
             <Card sx={{ minWidth: 275 , background: '#ecf2f8'}}>
                <CardContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="name"
                    value={location.state.integration.name}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                />
                <TextField
                    margin="dense"
                    id="receiver"
                    label="receiver"
                    value={location.state.integration.receiver}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                />

                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
        </>
    )
}