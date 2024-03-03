import Card from 'react-bootstrap/Card';
import { useState, React, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function CustomCard(props) {

  let dispatch=useDispatchCart();
  let data=useCart();

  const priceRef=useRef();

  let options = props.foodOptions;
  let priceOptions = Object.keys(options);
  let foodItems = props.foodItems;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {

    let food = []

    for (const item of data) {           //pre-existing item
      if (item.id === foodItems._id) {
        food = item;
        console.log("food",food)
        break;
      }
    }
  
    console.log(new Date())

    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty })
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size,img:foodItems.img })
        console.log("Size different so simply ADD one more to the list")
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size, img:foodItems.img })
  }

  let finalPrice=qty*parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div className='container'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={foodItems.img} style={{ height: "200px", objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{foodItems.name}</Card.Title>
          <Card.Text>
            {foodItems.description.slice(0,30)+"..."}
          </Card.Text>
          <div className='container'>
            <select  onChange={(e) => setQty(e.target.value)}>
              {
                Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })
              }
            </select>
            <select className='mx-2' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div style={{margin:"10px 0"}} >₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button className='btn justify-center ms-2' style={{backgroundColor:"rgb(243, 148, 60)",color:"#fff"}} onClick={handleAddToCart}>Add to Cart</button>
        </Card.Body>
      </Card>
    </div>
  )
}
