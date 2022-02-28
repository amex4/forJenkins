import React from "react";
import axios from "axios"
export default class ExpenseAdd extends React.Component{

     constructor(props){
        super(props)

        this.onChangeItem = this.onChangeItem.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangePaidBy = this.onChangePaidBy.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            item : '',
            price : 0,
            paidBy : '',
            paidArr : []
        }
    }

    async componentDidMount(){
        try{
        const {data : tasks} = await axios.get('http://localhost:5000/users/')
        
        this.setState(
            {
              paidArr: tasks.user.map((task) => {
                 const { username } = task
                  return username
              }),
              paidBy : tasks.user[0].username,  
            }
        )
    }
    catch(err){
            console.log(err)
    }
}

    onChangeItem(e){
        this.setState(
            {
                item : e.target.value
            }
        )
    }

     onChangePrice(e){
        this.setState(
            {
                price : e.target.value
            }
        )
    }

     onChangePaidBy(e){
        this.setState(
            {
                paidBy : e.target.value
            }
        )
    }

    async onSubmit(e){
        e.preventDefault()

        const Expense = {
            item : this.state.item,
            price : this.state.price,
            paidBy : this.state.paidBy,
        }
         try {
           await axios.post('http://localhost:5000/expenses/add',Expense)  

        } catch (error) {
            console.log(error)
        }
        const {data : tasks} = await axios.get('http://localhost:5000/users/')
        let newborrowed = 0
        let lent = 0
        let id = 0
        let id2 = 0

        for(let i = 0; i < tasks.user.length;i++){
            if(this.state.paidBy === tasks.user[i].username){
                id = tasks.user[i]._id
                lent = tasks.user[i].lent          
            }
        }
        let newlent = lent + Number(this.state.price)
        console.log(newlent);
        const Lent = {
            lent : newlent
        }
        try {
            await axios.patch('http://localhost:5000/users/'+id,Lent)
        } catch (error) {
            console.log(error)
        }
        for(let  i = 0; i < tasks.user.length;i++)
        {
            newborrowed = tasks.user[i].borrowed + Number(this.state.price/tasks.user.length)
            id2 = tasks.user[i]._id
            console.log(newborrowed,id2)
            try {
                await axios.patch('http://localhost:5000/users/'+id2,{borrowed : newborrowed})

            } catch (error) {
              console.log(error)  
            }
        }
     //   window.location = "/"
    }
    render(){
    return(
        <div>
            <h3>Add New Expense</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>ENTER ITEM</label>
                    <input type="text"
                    className = "form-control"
                    value={this.state.item}
                    onChange={this.onChangeItem}
                    />
                </div>
                <div className="form-group">
                    <label>ENTER PRICE</label>
                    <input type="number"
                    className = "form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    />
                </div>
                  <div className="form-group">
                    <label>ENTER USERNAME </label>
                   <select ref = {this.textInput}
                    required
                    className = "form-control"
                    value={this.state.paidBy}
                    onChange={this.onChangePaidBy}> 
                    {
                        this.state.paidArr.map(function(paid){
                            return <option
                                key = {paid}
                                value = {paid}>
                                    {paid}
                            </option>
                        })
                    }

                   </select>
                </div>


                <div className="form-group" >
                    <input type="submit" value="submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
    }
}

