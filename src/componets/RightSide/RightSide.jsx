import React from 'react'
import CustomerReview from "../CustomerReview/CustomerReview";
import "./RightSide.css";

export const RightSide = () => {
  return (
    <div className="RightSide">
        <div>
            <h3 style={{padding:'0px 0px 50px 0px'}}>Integrations Review</h3>
            <CustomerReview />
        </div>
  </div>
  )
}
