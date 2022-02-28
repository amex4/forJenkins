import React from "react";
import axios from "axios"

const Expense = props => (
    <tr>
        <td>{props.expense.item}</td>
        <td>{props.expense.price}</td>
        <td>{props.expense.paidBy}</td>
        <td>
            <button type="button" class="delete-btn" onClick={() =>{props.deleteExpense(props.expense._id)}}>
                <i class="fas fa-trash">Del</i>
            </button>
        </td>
    </tr>
)


export default class ExpenseList extends React.Component{
    constructor(props){
        super(props)
        this.deleteExpense = this.deleteExpense.bind(this)
        this.state = {expenses : []}
    }
    async componentDidMount(){
        try{
        const {data : task} = await axios.get('http://localhost:5000/expenses')
        this.setState({
            expenses : task.expense
        } )  
    }
    catch(err){
        console.log(err)
        }
    }

    async deleteExpense(id){
        const{data : tasks} = await axios.get('http://localhost:5000/expenses/'+ id)
        const{data : users} = await axios.get('http://localhost:5000/users/')
        for(let i = 0;i < users.user.length; i++)
        {
           if(users.user[i].username === tasks.expense.paidBy)
           {
               await axios.patch('http://localhost:5000/users/'+ users.user[i]._id,{lent : users.user[i].lent - tasks.expense.price})
           }
      //      console.log(users.user[i].borrowed - )
            await axios.patch('http://localhost:5000/users/'+ users.user[i]._id,{borrowed : users.user[i].borrowed - (tasks.expense.price/users.user.length)})
         }

        await axios.delete('http://localhost:5000/expenses/'+ id)
        //const {data : tasks} = await axios.get('http://localhost:5000/users/')
        //for(let i =0;i<tasks.users.length;i++){
          //  if (tasks.users[i].name === this.state.paidBy){
            //    tasks.users[i].lent = tasks.user[i].lent - this.state.price 
            //}
        //}
        this.setState({
            expenses : this.state.expenses.filter(el => el._id !== id)
        })
    }

    expenseList(){
        return this.state.expenses.map(currentexpense => {
            return <Expense expense={currentexpense} deleteExpense = {this.deleteExpense} key={currentexpense._id}/>
        })
    }

   

    render(){
    return(
        <div>
            <h3>EXPENSES</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>item</th>
                        <th>price</th>
                        <th>paid by</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.expenseList()}
                </tbody>
            </table>
        </div>
    )
    }
    }

