import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import AOS from "aos";
import { Routes, Route, } from "react-router-dom";
import "aos/dist/aos.css";
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home'
import Footer from './components/Footer/Footer';
import Allcategory from './components/Books/Allcategory';
import Profile from './components/User/Profile';
import AddresList from './components/User/AddresList';
import CartList from './components/User/CartList';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Payment from './payment/Payment';
import EditProfile from './components/User/EditProfile';
import Checkout from './payment/Chekout';
import WishList from './WishList/WishList';
import OrderSuccess from './payment/OrderSuccess';
import Password from './components/Auth/Password';
import Books from './components/Books/Books';
import BookDetailes from './components/Books/BookDetailes';
import OrderSummary from './payment/OrderSummary';
import OrderList from './components/User/OrderList';
import AuthGuard from './components/Context/AuthGuard';

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800, easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh()
  }, [])
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 '>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allcategory' element={<Allcategory />} />
          {/* <Route path="/books" element={<Books />} /> */}
          <Route path='/books/:category' element={<Books />} />
          <Route path='/bookdetailes/:id' element={<BookDetailes />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<AuthGuard />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/addreslist' element={<AddresList />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/password' element={<Password />} />
            <Route path="/cartlist" element={<CartList />} />
            <Route path='/chekout' element={<Checkout />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/ordersummary' element={<OrderSummary />} />
            <Route path='/orderlist' element={<OrderList />} />
            <Route path='/ordersuccess' element={<OrderSuccess />} />
            <Route path='/wishlist' element={<WishList />} />
          </Route>
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/aboutus' element={<AboutUs />} />
        </Routes>
      </div >
      <Footer />
    </div >


  )
}

export default App
