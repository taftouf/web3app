import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";



export const CardsHome = () => {
  const address = useSelector((state)=>state.account.address);
  const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
  const [cardsData, setCardsData] = useState([]);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [total, setTotal] = useState(0);
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
      await fetch('http://127.0.0.1:8000/api/payments/static', requestOptions)
      .then(response => response.json())
      .then(data => {
          setTransaction(data['data']);
          setFailed(sum(data['data'].failed))
          setSuccess(sum(data['data'].success))
          setTotal(sum(data['data'].success)+sum(data['data'].failed))
      })
      .catch(err => {
          console.log(err);
      });
    }

    function sum(tab){
        let sum = 0;
        tab.forEach(element => {
            sum+=element;
        });
        return sum;
    }

    useEffect(()=>{
      getTransaction();
    }, [])
    

  return (
    <div className="Cards">
          <div className="parentContainer">
            <Card
              title={"Success Transactions"}
              barValue={Math.trunc((success/total)*100)}
              value={success}
              series={success +" Transaction"}
            />
          </div>
          <div className="parentContainer">
            <Card
              title={"Failed Transactions"}
              barValue={Math.trunc((failed/total)*100)}
              value={failed}
              series={failed +" Transaction"}
            />
          </div>
          
    </div>
  )
}
