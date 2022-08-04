import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
import Grid from '@mui/material/Grid';
import { theme } from '../../componets/theme';
import { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from "react-redux";



export const Cards = () => {
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const [tokens, setTokens] = useState([]);
  const address = useSelector((state)=>state.account.address);
  const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
  const [cardsData, setCardsData] = useState([]);
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
        console.log(data);
        setTokens(data['token']);
    })
    .catch(err => {
        console.log("error test");
    });
    }

    useEffect(()=>{
      getTokens();
    }, [])

    useEffect(()=>{
      getData();
    },[tokens]);


    const getData = async()=>{
      var sum = 0;
      Object.keys(tokens).map((token, i)=>{
        sum = sum + tokens[token];
      })
      Object.keys(tokens).map((token, i)=>{
        var data = 
          {
            title: token,
            barValue: (tokens[token]/sum)*100,
            value: tokens[token]
          } 
          console.log("dodo=>" ,data);

          setCardsData(cardsData => [...cardsData,data])

          // cardsData.push(data); 
          console.log(cardsData);
      })
    }

  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              barValue={card.barValue}
              value={card.value}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  )
}
