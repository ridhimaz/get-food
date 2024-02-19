import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                name: credentials.name,
                location: credentials.location,
                email: credentials.email,
                password: credentials.password
            })
        });

        const fetchedData = await response.json();
        console.log("fetched", fetchedData);

        if (!fetchedData.success) {
            alert("Enter valid credentials");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <input type="text" placeholder="Enter your name" name="name" value={credentials.name} onChange={onChange} />
                </Form.Group>

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

                <Form.Group className="mb-3" >
                    <Form.Label>Address</Form.Label>
                    <input type="text" placeholder="Enter your location" name="location" value={credentials.location} onChange={onChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </Form>
        </div>
    )
}
