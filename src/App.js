import React from "react"
import{
  BrowserRouter as  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import ExpenseList from "./components/expenseList";
import ExpenseEdit from "./components/expenseEdit";
import ExpenseAdd from "./components/addExpense";
import UserList from "./components/users"
import UsersList from "./components/usersList"
import Navbar from "./Navbar/navbar";

const App = ()=> {
  return (
    <Router>
      <div className= "container">
      <Navbar/>
      <Switch>
        <Route exact path = "/" >
          <ExpenseList/>
        </Route>
        <Route exact path = "/edit">
          <ExpenseEdit/>
        </Route>
          <Route exact path = "/add">
          <ExpenseAdd/>
        </Route>
          <Route exact path = "/user">
          <UserList/>
        </Route>
        <Route exact path = "/users">
          <UsersList/>
        </Route>
        <Redirect to = "/" />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
