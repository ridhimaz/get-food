import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/loginuser", {
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
        <div className='container'>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <input type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} autoComplete="on" />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to="/createuser" className="m-3 btn btn-danger">I am a new user</Link>
            </Form>
        </div>
    )
}
