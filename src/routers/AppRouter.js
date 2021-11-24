import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import BookList from '../books/BookList'
import CreateBook from '../books/CreateBook'


import { createBrowserHistory } from "history";
export const history = createBrowserHistory()


const AppRouter = (props) => (
<Router history={history}>
        <div>
            <Switch>
               <Route path="/" component={BookList} exact={true}/>
               <Route path="/create" component={CreateBook} exact={true}/>
               <Route path="/edit/:id" component={CreateBook} exact={true}/>
               </Switch>
        </div>
</Router>
);
export default AppRouter;
