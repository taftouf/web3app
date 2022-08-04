import { CircularProgressbar } from "react-circular-progressbar";
import React from 'react';
import "./Card.css";



const Card = (props) => (
  <div className="CompactCard">
     <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={props.barValue}
        />
      </div>
      <div className="detail">
        <span>{props.value}</span>
        <span>{props.title}</span>
      </div>
  </div>
)

export default Card;