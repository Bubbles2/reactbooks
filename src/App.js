import AppRouter from "./routers/AppRouter";
import './App.css';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import booksReducer from './reducers/books'

const rootReducer = combineReducers({
  books: booksReducer
})

const store = createStore(rootReducer, 
  composeWithDevTools(
   applyMiddleware(ReduxThunk)
  )
 );

function App() {
  return (
    <div>
    <Provider store={store}>
    <AppRouter/>
    </Provider>
    </div>
  
);
}


export default App;

