import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './screens/Login';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup';
import MyOrder from "./screens/MyOrder";
import CartProvider from './components/ContextReducer';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createuser" element={<Signup />}></Route>
          <Route path="/myOrder" element={<MyOrder/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
