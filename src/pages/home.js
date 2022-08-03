import React from 'react'
import { Cards } from '../componets/Cards/Cards'
import Table from '../componets/Table/Table'
import './home.css'

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
import { RightSide } from '../componets/RightSide/RightSide'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
export const Home = ()=>{
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div className='MainDash'>
        <h1>Overview</h1>
        <Cards />
  
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{md:3 }}>
              <Grid item xs={isSmall ? 12 : 8}>  
                <Table />        
              </Grid>
              <Grid item xs={isSmall ? 12 : 4}> 
                <RightSide />
              </Grid>
          </Grid>
        </Box> 
            {/* </div>
        </div> */}
        
    </div>
  )
}
