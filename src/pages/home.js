import React from 'react'
import { Cards } from '../componets/Cards/Cards'
import Table from '../componets/Table/Table'
import './home.css'
import Grid from '@mui/material/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { theme } from '../componets/theme';
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
  const isSmall = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box className='MainDash'>
        <h1>Overview</h1>
        <Cards />
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{md:1 }}>
              <Grid item xs={isSmall ? 12 : 8}>  
                <Table />        
              </Grid>
              <Grid item xs={isSmall ? 12 : 4}> 
                <RightSide />
              </Grid>
          </Grid>
        </Box> 
    </Box>
  )
}
