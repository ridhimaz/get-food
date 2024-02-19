import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Header() {
  const navigate = useNavigate();
  const data=useCart();
  const [cartView,setCartView]=useState(false)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <Navbar key={1} expand="lg" className="navbar navbar-expand navbar-dark bg-success" >
        <Container fluid>
          <Navbar.Brand ><Link className='nav-link fs-1' to="/">GoFood</Link></Navbar.Brand>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className='nav-link active' to="/">Home</Link>
            {
              (localStorage.getItem("authToken")) ?
                <Link className='nav-link active' to="/myOrder">My Orders</Link> :
                ""
            }
          </Nav>
          {
            (!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className='nav-link btn bg-white text-success mx-1 p-2' to="/login">
                  Login
                </Link>

                <Link className='nav-link btn bg-white text-success mx-1 p-2' to="/createuser">
                  SignUp
                </Link>
              </div>
              :
              <div>
                <div className='btn bg-white mx-2' onClick={()=>setCartView(true)}>My Cart{" "}
                <Badge pill bg="danger">{data.length}</Badge></div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
                <div className='btn bg-white mx-2 text-danger' onClick={handleLogout}>Logout</div>
              </div>
          }
        </Container>
      </Navbar>

    </div>
  )
}
