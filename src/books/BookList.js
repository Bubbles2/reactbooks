import React , { useState, useEffect } from 'react';
import BookListItem from './BookListItem'
import { useSelector, useDispatch } from 'react-redux'
import * as bookActions from '../actions/books'
import Header from '../ui/Header'
import classes from './Book.module.css';
import BaseCard from '../ui/BaseCard/BaseCard';




export const BookList = (props) => { 

    const bookClasses = [];

    const [isLoading, setIsLoading] = useState(true);
    const books = useSelector(state => state.books)
    const dispatch = useDispatch();


   
    
    //
    useEffect(() => {
        setIsLoading(true)
        dispatch(bookActions.startGetBooks()).then((data) => {
               setIsLoading(false);
    }, err => console.log("Error ===>", err));

    }, [])

    return(
        <div>
        <Header></Header>
     
        {
            books.length === 0 ? (
                <div className={bookClasses.join(' ')}>
                    <span>No recipes</span>
                </div>
            ) : (
                books.map((book) => {
                     return<BookListItem key={book._id} {...book} /> ;
                })
            )
        }
        </div>)
}

export default BookList;
