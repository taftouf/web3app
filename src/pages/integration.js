import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import Grid from '@mui/material/Grid';
import { theme } from '../componets/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../componets/Table/Table.css";
import DetailsIcon from '@mui/icons-material/Details';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      background: '#86E4F7',
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
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    dialog : {
        width : 500,
        [theme.breakpoints.down("sm")]: {
            width : 100,
          }
    },
    buttonIntegration : {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #b5b3b3 40%, #dbdbdb 90%)',
        color: 'black',
        padding: 8,
        width: '100%',
        border: '0',
        borderRadius: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        "&:hover":{
            background: 'white'
        },
        cursor: 'pointer',
    }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
'& .MuiDialogContent-root': {
    padding: theme.spacing(2),
},
'& .MuiDialogActions-root': {
    padding: theme.spacing(1),
},
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const Integrations=()=>{
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [integrations, setIntegrations] = useState([]);
    const navigate = useNavigate();
    const [rows, setRow] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [del, setDel] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setopenDelete] = useState(false);
    const [openDetail, setOpenDetails] = useState(false);
    const [updateName, setUpdateName] = useState("");
    const [updateAddress, setUpdateAddress] = useState("");
    const [id, setId] = useState("");
    const columns = [
        {field: "id", hide: true},
        {
            field: 'key',
            headerName: 'Key',
            flex: 1
        },
        { 
            field: 'name',
            headerName: 'Name',
            editable: true,
            flex: 1
        },
    
        {
            field: 'receiver',
            headerName: 'Receiver',
            editable: true,
            flex: 1
        },
        {
            field: "delete",
            width: 10,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                <IconButton
                    onClick={async() => {
                    setOpenDel(true);
                    }}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
                );
            }
        }
      ];

      const deleteIntegration = async() =>{
        if(del){
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
            .then(data => {
                setRow((r) => r.filter(function(el) { return el.id != id }));
                setopenDelete(true);
            })
            .catch(err => {
                console.log(err);
            });
        }
      }
      
    const getIntegration = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/integrations', requestOptions)
        .then(response => response.json())
        .then(data => {
            setRow([]);
            data['integration'].map((integration,i)=>{
                setRow(rows => [...rows, { id :integration._id.$oid ,key:integration?.key, name: integration.name, receiver: integration.receiver }]);
            });
        })
        .catch(err => {
            console.log("error test");
        });
    }

    useEffect(()=>{
        deleteIntegration();
    }, [del]);

    useEffect(()=>{
        getIntegration();
    },[])
   
    const AddIntegration= async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ 
                owner: address,
                name: name })
        };
        await fetch('http://127.0.0.1:8000/api/integrations', requestOptions)
        .then(response => response.json())
        .then(data => {
            setRow([]);
            data['integration'].map((integration,i)=>{
                setRow(rows => [...rows, { id :integration._id.$oid ,key:integration?.key, name: integration.name, receiver: integration.receiver }]);
            });
            setOpenAdd(true);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    const Update = async() => {
        const requestOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'receiver': updateAddress,
                'name': updateName,
                '_id': id
            }
        };
        await fetch('http://127.0.0.1:8000/api/integration/'+id+'/update', requestOptions)
        .then(response => response.json())
        .then(data => {getIntegration();setOpenUpdate(true)})
        .catch(err => console.log(err));
    };


    const actionAdd = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(event, reason) => {
                if (reason === 'clickaway') {
                return;
                }
        
                setOpenAdd(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

      const actionUpdate = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(event, reason) => {
                if (reason === 'clickaway') {
                return;
                }
        
                setOpenUpdate(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

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

    return (
        <>
        <h1>Integrations</h1>
            <Card elevation={4} sx={{ minWidth: 275 , background: 'white'}}>
                <CardContent>
                    <Button
                        variant="contained"
                        onClick={()=>setOpen(true)}
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        <span className={classes.buttonText}>New Integration</span>
                    </Button>

                </CardContent>
            </Card>

            <Dialog 
                open={open} 
                TransitionComponent={Transition}
                onClose={()=> setOpen(false)} 
                PaperProps={{
                    sx: {
                        width: "50%",
                        maxHeight: 300
                    }
                }
            }>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                </DialogContent>
                <DialogActions>
                <Button startIcon={<AddCircleIcon />} onClick={async()=>{AddIntegration();setOpen(false)}}>Add</Button>
                </DialogActions>
            </Dialog>

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
                <DialogTitle>Delete Integration</DialogTitle>
                <DialogActions>
                    <Button sx={{color:"red"}} startIcon={<DeleteOutlinedIcon />} onClick={async()=>{setDel(true); setOpenDel(false)}}>Delete</Button>
                    <Button startIcon={<CancelOutlinedIcon />} onClick={async()=>{setDel(false); setOpenDel(false)}}>cancel</Button>
                </DialogActions>
            </Dialog>

            
            <Box sx={{ mt:4,height: 371, width: '100%'}}>  
                <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                >
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Reaciver</TableCell>
                                <TableCell align="left">Integration Key</TableCell>
                                <TableCell align="left"> Actions </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ color: "white" }}>
                        {rows.map((row, i) => (
                            <TableRow
                            key={i}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" align="left">{row.receiver}</TableCell>
                            <TableCell component="th" align="left">{row.key}</TableCell>
                            <TableCell component="th" scope="row">
                                <IconButton onClick={()=>{setUpdateAddress(row.receiver);setUpdateName(row.name);setId(row.id);setOpenDetails(true)}} aria-label="delete" sx={{color:"grey"}}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={()=>{setId(row.id); setOpenDel(true)}} aria-label="delete" sx={{color:"red"}}>
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
                

            <Snackbar
                open={openUpdate}
                autoHideDuration={6000}
                onClose={
                    (event, reason) => {
                        if (reason === 'clickaway') {
                        return;
                        }
                
                        setOpenUpdate(false);
                    }
                }
                message="Integration Updated successfuly"
                action={actionUpdate}
            />

            <Snackbar
                open={openAdd}
                autoHideDuration={6000}
                onClose={
                    (event, reason) => {
                        if (reason === 'clickaway') {
                        return;
                        }
                
                        setOpenAdd(false);
                    }
                }
                message="Integration Added successfuly"
                action={actionAdd}
            />

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
                message="Integration deleted successfuly"
                action={actionDelete}
            />
            <BootstrapDialog
                onClose={()=>{setOpenDetails(false)}}
                aria-labelledby="customized-dialog-title"
                open={openDetail}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{setOpenDetails(false)}}>
                Update Integration
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <TextField
                    gutterBottom
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    value={updateName}
                    fullWidth
                    onChange={(e) => {
                        setUpdateName(e.target.value);
                    }}
                />
                <TextField
                    gutterBottom
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    value={updateAddress}
                    fullWidth
                    onChange={(e) => {
                        setUpdateAddress(e.target.value);
                    }}
                />
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={()=>{Update();setOpenDetails(false)}}>
                    Save changes
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    )
}
