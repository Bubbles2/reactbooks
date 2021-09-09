import React from 'react'
import classes from './BaseCard.module.css'
const BaseCard = props =>{
    return (
        <div  className = {classes.myCard} >
        {props.children}
        </div>
  
    )
} 
export default BaseCard