//==================================================================================
// This is based on a functional component so we can use hooks and the forms reducer
// This versioon includes a separate input component
// it seems more complicated because of the separate input component and 2 
// forms reduces but in the end this is the easier option because it makes 
// field validation easier
//==================================================================================  
import React, { useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../ui/Header'
import classes from './Book.module.css';
import Button from '../ui//Button/Button';
import { useHistory, useParams } from 'react-router-dom'
import Input from '../ui/Input/Input';

import * as bookActions from '../actions/books'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//==================================================================================
//Reducer to change form state
//==================================================================================  
const formReducer = (state, action) => {

  //const [key, setKey] = useState('overview');

  // Input classes is used to set up the CSS class names we will
  // use to display errors

  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    const updatedClasses = {
      ...state.inputClasses,
      [action.input]: action.class
    };
    let updatedFormIsValid = true;


    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputClasses: updatedClasses,
      inputValues: updatedValues
    };
  }
  return state;
};
//==================================================================================
// Functional Component
//==================================================================================  
const CreateBook = (props) => {

  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams()


  const editBook = useSelector(state =>
    state.books.find(book => book._id === id)
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editBook ? editBook.title : '',
      description: editBook ? editBook.description : '',
      author: editBook ? editBook.author : '',
    },
    inputValidities: {
      title: true,
      description: true,
      author: true,
    },
    inputClasses: {
      title: '',
      description: '',
      author: ''
    },
    formIsValid: true
  });
  //==================================================================================
  // Manage input change - Vesion with separate Input
  //==================================================================================  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log("inputChangeHandler    ==>", inputIdentifier + "  " + inputValue + "  " + inputValidity)

      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  //==================================================================================
  // Validate sunmitted
  //==================================================================================
  const valSubmit = () => {
    // This validation routine is run only when we submit, we can expand it to
    // include other types of tests such as email or required, this solution is
    // not as clean as angular

    // Loop through form state values
    for (const [key, value] of Object.entries(formState.inputValues)) {
      let className = ''
      let validState = true
      // Make sure the value is not empty
      if (value.trim().length === 0) {
        className = classes.error
        validState = true
      }
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value,
        isValid: validState,
        input: key,
        class: className
      });
    }
  }
  //==================================================================================
  // Process submitted data
  //==================================================================================
  const submitHandler = useCallback((event) => {

    event.preventDefault()
    console.log("Event  ==>")

    valSubmit()

    if (!formState.formIsValid) {
      console.log("Error ==>")
      return;
    }
    if (editBook) {
      console.log("Update Process ==>")
      const book = {
        _id: editBook._id,
        title: formState.inputValues.title,
        description: formState.inputValues.description,
        author: formState.inputValues.author,
       }
      dispatch(
        bookActions.startUpdateBook(book))
      history.push('/')
    } else {
      console.log("Create Process ==>")
      const book = {
        title: formState.inputValues.title,
        description: formState.inputValues.description,
        author: formState.inputValues.author
      }
      dispatch(
        bookActions.startCreateBook(book))
      history.push('/')

    }

  }, [dispatch, id, formState]);
  //==================================================================================
  // Build Form
  //==================================================================================
  let form = (
    <div>
      <div>
        <Input
          id="title"
          label="Title"
          elementType="input"
          errorText="Please enter a valid title!"
          onInputChange={inputChangeHandler}
          initialValue={editBook ? editBook.title : ''}
          initiallyValid={true}
          required
          min="5"
        />
      </div>

      <div>
      <Input
        elementType="input"
        id="author"
        label="Author"
        errorText="Please enter an author"
        onInputChange={inputChangeHandler}
        initialValue={editBook ? editBook.description : ''}
        initiallyValid={true}
        required
      />
    </div>

      <div>
        <Input
          elementType="textarea"
          id="description"
          rows="3"
          label="Description"
          errorText="Please enter a description"
          onInputChange={inputChangeHandler}
          initialValue={editBook ? editBook.description : ''}
          initiallyValid={true}
          required
        />
      </div>
    </div>
  );

  let formRecipe = (
    <div>
      <div>
        <Input
          elementType="textarea"
          id="book"
          label="Book"
          rows="5"
          errorText="Please enter a book"
          onInputChange={inputChangeHandler}
          initialValue={editBook ? editBook.book : ''}
          initiallyValid={true}
          required
          min="5"
        />
      </div>


    </div>
  );

  return (
    <div>
      <Header></Header>


      <div className={classes.container}>
        <h4>Enter your Book</h4>
        <form onSubmit={submitHandler}>
          <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
            <Tab eventKey="overview" title="Overview">
              {form}
            </Tab>
            <Tab eventKey="photos" title="Photos">
              {editBook && <img className={classes.imageBoxDetail} src={editBook.imageUrl} alt="No Image" />}
            </Tab>
            <Tab eventKey="book" title="Book">
              {formRecipe}
            </Tab>
          </Tabs>
          <div className="row justify-content-center" >
            <Button btnType="Success">{editBook ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>




  );

}

export default CreateBook;
