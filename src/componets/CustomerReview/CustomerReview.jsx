import React from "react";
import Chart from "react-apexcharts";
import './CustomerReview.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CustomerReview = () => {
 const [successPay, setsuccessPay] = useState(0);
 const [payments, setPayments] = useState([]);
 const address = useSelector((state)=>state.account.address);
 const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
 const [categories, setCategories] = useState([]);
 const [success, setSuccess] = useState([]);
 const [failed, setFailed] = useState([]);
 const getData = async()=>{
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
        setPayments(data['data']);
    })
    .catch(err => {
        console.log("error test");
    });
  }

  

  useEffect(()=>{
    getData();
  }, [])
 
  const data = {
    series: [{
      name: 'Cancelled',
      data: payments['failed']
    }, {
      name: 'Aproved',
      data: payments['success']
    }],
    
    options: {
      chart: {
        type: "bar",
        height: "auto",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      fill: {
        opacity: 1,
      },    
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val + " Tx"
          }
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: payments['name'],
      },
      yaxis: {
        title: {
          text: 'Transactions'
        }
      },
      toolbar:{
        show: false
      }
    },
  };
  return <div className="CustomerReview">
        <Chart options={data.options} series={data.series} type="bar" />
  </div>;
};

export default CustomerReview;