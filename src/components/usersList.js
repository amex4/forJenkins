import React from "react";
import axios from "axios"
const User = props => (
    <tr>
        <td><h4>{props.user.username}{props.user.lent > props.user.borrowed ? ` lent ${props.user.lent - props.user.borrowed}`:` borrowed ${props.user.borrowed-props.user.lent}`}</h4></td>
        <td>
            <button type="button"  onClick={() =>{props.deleteUser(props.user._id)}}>
                Del
            </button>
        </td>
    </tr>
)

export default class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.deleteUser = this.deleteUser.bind(this)
        this.state = {users : []}
    }
    async componentDidMount(){
        try{
        const {data : task} = await axios.get('http://localhost:5000/users')
        this.setState({
            users : task.user
        } )  
    }
    catch(err){
        console.log(err)
        }
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/users/'+ id)
        this.setState({
            users : this.state.users.filter(el => el._id !== id)
        })
    }

    usersList(){
        return this.state.users.map(currentuser => {
            return <User user={currentuser} deleteUser = {this.deleteUser} key={currentuser._id}/>
        })
    }

   

    render(){
    return(
        <div>
            <h3>Users</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.usersList()}
                </tbody>
            </table>
        </div>
    )
    }
    }

