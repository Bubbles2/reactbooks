import React, { useReducer, useEffect } from 'react';
import classes from '../../books/Book.module.css';
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      console.log("InINPUT_CHANGE  ==>",action)
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true
      };
    // Just used to mange touched state
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const InputB = props => {
  
    let inputClasses = [];
    let inputElement = null;


      // create reducer to manage just this input state
      const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
      });

  
    console.log("Value  ===>",inputState.value)
  // Perform Validations in the Input component , this will update the local state
  // above we can see the useEffect will will update parent state usng the function  onInputChange
  // if the local state changes
  const textChangeHandler = event => {
    inputError= ''
    const text = event.target.value
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && text.length < props.min) {
      isValid = false;
    }
    if (props.max != null && text.length > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    console.log("In input   ==>",text+" --  "+isValid)
    //
    if(!isValid)inputError=classes.error
    // Update local state
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });

  };


  // Update state to indicate touched
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

    switch ( props.elementType ) {
      case ( 'input' ):
          inputElement = <input
          id= {props.id}
          className={inputState.isValid ? classes.valid : classes.error}
          value={inputState.value}
          onChange={textChangeHandler}
          onBlur={lostFocusHandler} />;
          //inputElement = <input type="text" id="lname" name="lname" placeholder="-- created  --"></input>
          break;
      case ( 'textarea' ):
          inputElement = <textarea
          id= {props.id}
          className={inputState.isValid ? classes.valid : classes.error}
          value={inputState.value}
          onChange={textChangeHandler}
          rows={props.rows}
          onBlur={lostFocusHandler} />;
          break;
      case ( 'select' ):
          inputElement = (
              <select
                  className={inputClasses.join(' ')}
                  value={props.value}
                  onChange={props.changed}>
                  {props.elementConfig.options.map(option => (
                      <option key={option.value} value={option.value}>
                          {option.displayValue}
                      </option>
                  ))}
              </select>
          );
          break;
      default:
          inputElement = <input
              className={inputClasses.join(' ')}
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed} />;
  }
        

    let inputError=''
  // Get values from props (onInputChange = inputChangeHandler in parent )
  const { onInputChange, id } = props;


      useEffect(() => {
        console.log("In useEffect  ==>",inputState)
        if (inputState.touched) {
          onInputChange(id, inputState.value, inputState.isValid);
        }
      }, [inputState, onInputChange, id]);

  return (
      <div>
      <div>
      <label>
      {props.label}
      </label>
     
      </div>
    <div>
    {inputElement}
    </div>
    {!inputState.isValid && inputState.touched &&  props.errorText}
      </div>
     
  );
};


export default InputB;
