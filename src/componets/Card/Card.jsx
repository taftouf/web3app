import { CircularProgressbar } from "react-circular-progressbar";
import React from 'react';
import "./Card.css";



const Card = (props) => (
  <div className="CompactCard"
  // style={{
  //   background: props.color.backGround,
  //   boxShadow: props.color.boxShadow,
  // }}
  >
     <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
         
        />
        <span>{props.title}</span>
      </div>
      <div className="detail">
        <span>${props.value}</span>
        <span>Last 24 hours</span>
      </div>
  </div>
)

export default Card;