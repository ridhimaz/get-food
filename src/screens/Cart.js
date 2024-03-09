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
  console.log("data", data);
  const price = data.reduce((sum, ele) => sum + ele.price, 0);

  console.log("sum", price);

  const handleCheckOut = async () => {

    const order = await fetch("https://get-food-c31i.onrender.com/api/payment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": price * 100,
        "currency": "INR"
      })
    });
    const res = await order.json();
    console.log("order", res);

    const options = {
      key: process.env.RAZORPAY_KEY_ID,                         // Enter the Key ID generated from the Dashboard
      amount: res.amount,                                      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: res.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: res.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://get-food-c31i.onrender.com/api/paymentverify",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
        if (jsonRes.msg === 'success') {
          console.log("drop")
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
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "rgb(243, 148, 60)"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
    razor.on('payment.failed', function (response) {

      alert(response.error.code);
      alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });





  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);



  return (
    <div>

      {console.log("data", data)}

      <div>

      </div>
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
        <div><h1 style={{ marginLeft: "10px", fontSize: "20px", marginTop: "40px", color: "#fff" }} className='text-start'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn mt-4' style={{ backgroundColor: "rgb(243, 148, 60)", marginLeft: "10px" }} onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>



    </div >
  )
}