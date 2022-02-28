import React from "react";
import { NavLink} from "react-router-dom";
const Navbar = ()=>{
    return(
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <NavLink to = "/" className = "navbar-brand">ExpenseTracker</NavLink>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <NavLink to = "/" className = "nav-link">Expenses</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to = "/add" className = "nav-link">Add Expense</NavLink>
                        </li>
                        <li>
                            <NavLink to = "/user" className = "nav-link">Create User</NavLink>
                        </li>
                         <li>
                            <NavLink to = "/users" className = "nav-link">user list</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
 
    )
}

export default Navbar