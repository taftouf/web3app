import { CircularProgressbar } from "react-circular-progressbar";
import React from 'react';
import "./Card.css";
import CircularProgress from "../CircularProgress/CircularProgress";


const Card = (props) => (
  <div className="CompactCard">
     <div className="radialBar">

        <CircularProgress
        size={100}
        strokeWidth={10}
        percentage={props.barValue}
        color="white"
      />
      </div>
      <div className="detail">
        <span>{props.value}</span>
        <span>{props.title}</span>
      </div>
  </div>
)

export default Card;