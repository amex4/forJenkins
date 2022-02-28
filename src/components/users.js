import React from "react";
import axios from "axios"
export default class UserList extends React.Component{
    
     constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
           username : ''
        }
    }

     onChangeUsername(e){
        this.setState(
            {
                username : e.target.value
            }
        )
    }

    async onSubmit(e){
        e.preventDefault()
        const user = {
            username : this.state.username
        }
        try{
        await axios.post('http://localhost:5000/users/add',user)
        }
        catch(err)
        {
            console.log(err)
        }
        
        console.log(user)
        alert('added user')
      
    }

    render() {
    return(
        <div className = "container">
            <h3>create new user</h3>
            <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                    <label>username</label>
                    <input type="text"
                    required
                    className = "form-control"
                    value = {this.state.username}
                    onChange = {this.onChangeUsername}
                    />
                </div>

                
                <div className="form-group">
                    <input type = "submit" value = "add new user" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
    }
}