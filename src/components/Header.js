import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Container from 'react-bootstrap/Container';


export default function Header() {
  const navigate = useNavigate();
  const data = useCart();
  const [cartView, setCartView] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <div key={1} expand="lg"  >
        <div> 
          <Navbar expand="lg" className="navbar-box">
            <Container>
            <Navbar.Brand><Link className='nav-link fs-1' id="title" to="/">YumYum</Link></Navbar.Brand>
              <Navbar.Toggle  style={{color:"#fff"}} />
              <Navbar.Collapse >
                <Nav className="me-auto">
                  <Nav style={{ display: "flex",  alignItems:"center", gap:"2px"}}>
                <Link style={{ fontWeight: "400", fontSize: "21px", color: "white" }} className='nav-link active' to="/">Home</Link>
                {
                  (localStorage.getItem("authToken")) ?
                    <Link style={{ fontWeight: "400", fontSize: "21px", color: "white" }} className='nav-link active' to="/myOrder">My Orders</Link> :
                    ""
                }
              </Nav>
                </Nav>
                {
                (!localStorage.getItem("authToken")) ?
                  <div  className="btn-box" style={{display:"flex",gap:"2px"}}>
                    <Link className='nav-link btn bg-white  mx-1 'style={{color:"rgb(243, 148, 60)", padding:"10px 30px"}} to="/login">
                      Login
                    </Link>
                    <Link className='nav-link btn bg-white mx-1' style={{color:"rgb(243, 148, 60)", padding:"10px 30px"}} to="/createuser">
                      SignUp
                    </Link>
                  </div>
                  :
                  <div className='cart-box' style={{ display: "flex"}}>
                    <div className='btn bg-white mx-2' onClick={() => setCartView(true)}>My Cart{" "}
                      <Badge pill bg="danger">{data.length}</Badge></div>
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
                    <div className='btn bg-white mx-2 text-danger' onClick={handleLogout}>Logout</div>
                  </div>
              }
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

    </div>
  )
}
