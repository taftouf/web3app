import React from "react";
import Chart from "react-apexcharts";
import './CustomerReview.css'

const CustomerReview = () => {
  const data = {
    series: [{
      name: 'Cancelled',
      data: [44, 55, 57]
    }, {
      name: 'Aproved',
      data: [76, 85, 101]
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
        categories: ['test1', 'test2', 'test3'],
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