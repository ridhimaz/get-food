import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginStyles.css";
export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://get-food-c31i.onrender.com/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });

        let data = await response.json();
        console.log("data: ", data);
        if (!data.success) {
            alert("Enter valid credentials");
        }
        if (data.success) {
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("authToken",data.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate("/")
            console.log("success")

        }
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='login'>
            <h1 id="heading" style={{ zIndex: '2'}}>Login</h1>
            <p id="para" style={{ zIndex: '2'}}>Tantalizing flavors await you!</p>
            <Form className="signup-form"onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                    <input 
                    type="email" placeholder="Enter your email here" name="email" value={credentials.email} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                    <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} autoComplete="on" />
                </Form.Group>


                <Button variant="primary" type="submit" style={{width:"100%",marginTop:"10px"}}>
                    Submit
                </Button>
               <div style={{textAlign:"center"}}>
               <Link to="/createuser"  className="new-user">I am a new user</Link>
               </div>
                
               
              
            </Form>
        </div>
    )
}
