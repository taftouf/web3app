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
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import {Button} from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const successStyles = {
  borderColor: '#22bb33',
  border: 1,
};

const failedStyles = {
  borderColor: '#22bb33',
  border: 1,
};

export const Payments=()=>{

    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));
    const [rows, setRow] = useState([]);
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    const [openDelete, setopenDelete] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [openDel, setOpenDel] = useState(false);
    const [del, setDel] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");


      const columns = [
        {field: "id", hide: true},
        {
            field: 'transactionHash',
            headerName: 'Transaction Hash',
            flex: 1
        },
        { 
            field: 'tokenIn',
            headerName: 'Token',
            flex: 1
        },
        {
            field: 'ApiKey',
            headerName: 'Integration Key',
            flex: 1
        },
        {
            field: 'status',
            hide: true,
            flex: 1
        },
        {
          field: 'statusStyled',
          headerName: 'status',
          renderCell: (params) =>{
            if(params.getValue(params.id, 'status') !== 'cancelled'){
              return  (<Box sx={{ color:'#22bb33', border:1,background:'#f3fdf4',p:1, borderRadius: '16px' }}> Approved </Box>)
            }else{
              return  (<Box sx={{ color:'#bb2124',border:1,background:'#fdf2f2',p:1, borderRadius: '16px' }}> Cancelled </Box>)
            }
          }
        },
        {
          field: 'action',
          headerName: 'Action',
          sortable: false,
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
      
              const api = params.api;
              const thisRow = {};
      
              api
                .getAllColumns()
                .filter((c) => c.field !== '__check__' && !!c)
                .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                );
              setOpenDel(true);
              setId(thisRow.id);
            };
      
            return <Button onClick={onClick} sx={{color:"red"}}><DeleteOutlinedIcon /></Button>;
          },
        },
        
      ];
      
      const deleteTransaction = async() =>{
        if(del){
            const requestOptions = {
                method: 'Get',
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Accept': 'application/json',
                    'Authorization': token,
                    '_id': id
                }
            };
            await fetch('http://127.0.0.1:8000/api/payments/delete', requestOptions)
            .then(response => response.json())
            .then(data => {
                setRow((r) => r.filter(function(el) { return el.id != id }) );
                setopenDelete(true);
            })
            .catch(err => {
                console.log(err);
            });
        }
      }
      

      const actionDelete = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(event, reason) => {
                if (reason === 'clickaway') {
                return;
                }
        
                setopenDelete(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const getPayments = async()=>{
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
            
            data['data'].map((payment,i)=>{
                setRow(rows => [...rows, 
                                { 
                                  id :payment._id.$oid ,
                                  transactionHash:payment.transactionHash,
                                  tokenIn: payment.tokenIn, 
                                  ApiKey: payment.ApiKey, 
                                  status: payment.status==1?"Approved":"cancelled" 
                                }
                              ]
                      );
            });
        })
        .catch(err => {
            console.log("error test");
        });
    }

    useEffect(()=>{
      if(del){
        deleteTransaction();
      }
  }, [del]);
    useEffect(()=>{
        getPayments();
    },[])
  return (
    <>
    <Box className='MainDash'>
        <h1>Payments</h1>
        <Cards />
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{md:1 }}>
              <Grid item xs={12}>  
              <Card elevation={4} sx={{background:'white', mt:2}}>
                <CardContent>
                    <Box sx={{ height: 371, width: '100%'}}>
                        <DataGrid
                            experimentalFeatures={{ newEditingApi: true }}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[3]}
                            onSelectionModelChange={(ids) => {
                                setSelectionModel(ids);
                              }}
                        />
                    </Box>
                </CardContent>
            </Card>      
              </Grid>
          </Grid>
        </Box> 
    </Box>
        <Snackbar
        open={openDelete}
        autoHideDuration={6000}
        onClose={
            (event, reason) => {
                if (reason === 'clickaway') {
                return;
                }
        
                setopenDelete(false);
            }
        }
        message="Transaction deleted successfuly"
        action={actionDelete}
    />
     <Dialog 
          open={openDel} 
          TransitionComponent={Transition}
          onClose={()=> setOpen(false)} 
          PaperProps={{
              sx: {
                  width: "50%",
                  maxHeight: 300
              }
          }
      }>
          <DialogTitle>Delete Transaction</DialogTitle>
          <DialogActions>
              <Button startIcon={<DeleteOutlinedIcon />} onClick={async()=>{setDel(true); setOpenDel(false)}}>Delete</Button>
              <Button startIcon={<CancelOutlinedIcon />} onClick={async()=>{setDel(false); setOpenDel(false)}}>cancel</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}
