import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// function createData(Tx, Token, date, status) {
//   return { Tx, Token, date, status };
// }

// const rows = [
//   createData("0xc778417e063141139fce010982780140aa0cd5ab", 'Link', "02/02/2022", "Approved"),
//   createData("0xc778417e063141139fce010982780140aa0cd5ab", 'USDC', "02/02/2022", "Cancelled"),
//   createData("0xc778417e063141139fce010982780140aa0cd5ab", 'Eth', "02/02/2022", "Approved"),
//   createData("0xc778417e063141139fce010982780140aa0cd5ab", 'Eth', "02/02/2022", "Cancelled"),
// ];


const makeStyle=(status)=>{
  if(status === 1)
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 0)
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const address = useSelector((state)=>state.account.address);
  const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
  const [rows, setRows] = useState([]);
  
  const getTransaction = async()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json' ,
          'Accept': 'application/json',
          'Authorization': token,
          'owner': address
      },
    };
    await fetch('http://127.0.0.1:8000/api/transactions', requestOptions)
    .then(response => response.json())
    .then(data => {
        setRows(data['data']);
    })
    .catch(err => {
        console.log("error test");
    });
  }
  
  useEffect(()=>{
    getTransaction();
  }, [])
  return (
      <div className="Table">
      <h3>Recent Transactions</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction Hash</TableCell>
                <TableCell align="left">Token</TableCell>
                <TableCell align="left">Integration Key</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {            
                      String(row.transactionHash).length > 20?(
                      String(row.transactionHash).substring(0, 10) +
                        "..." +
                      String(row.transactionHash).substring(60)
                      ): String(row.transactionHash)              
                   }
                  </TableCell>
                  <TableCell align="left">{row.tokenIn}</TableCell>
                  <TableCell align="left">{row.ApiKey}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status==0?"cancelled":"approved"}</span>
                  </TableCell>
                  {/* <TableCell align="left" className="Details">Details</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}