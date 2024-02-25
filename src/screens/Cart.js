import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        console.log("The Cart is Empty!")
        return <div className='' style={{ fontSize: "4rem", color: "#fff", textAlign: "center" }}>The Cart is Empty!</div>
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

      const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("https://get-food-c31i.onrender.com/api/orderData", {
           
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
      }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log("data", data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <td scope='row' >{index + 1}</td>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type="button" className="btn p-0" >
                                   <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 style={{ fontSize: "4rem", color: "#fff", textAlign: "center" }} className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>



        </div >
    )
}