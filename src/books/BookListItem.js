import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Book.module.css';
import BaseCard from '../ui/BaseCard/BaseCard'

const BookListItem = ({ _id, title, description , imageUrl, servings, prep }) => {
    const bookClasses = [classes.rowElement];

    return (
        <BaseCard>
        <Link to={`/createb/${_id}`}>
        <div>
           
                <div className={[classes.col4]}>
                <div>{title}</div>
                <div>{description}</div>  
                </div>


        
            <div className={[classes.col4A]}>
            <div style={{textAlign: "right", overflow: "hidden"}}>
            <img className={[classes.imageBox]} src={imageUrl} alt="Food Image"/>
            </div>
            </div>
            
        </div>
    </Link>
        
        </BaseCard>
       
    )
}

export default BookListItem;