import { useEffect } from 'react'
import AOS from "aos";
import { Routes, Route, } from "react-router-dom";
import "aos/dist/aos.css";
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home'
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
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout'
import Dashboard from './Admin/pages/Dashboard';
import AdminLogin from './Admin/pages/AdminLogin';
import StatCard from './Admin/components/StatCard';
import Users from './Admin/pages/Users';
import Revenue from './Admin/pages/Revenue';
import AdminBooks from './Admin/pages/AdminBooks';
import AdminOrders from './Admin/pages/AdminOrders';
import AddBooks from './Admin/components/AddBooks';
import AdminAuthGuard from './Admin/AdminAuthGuard';
import AOVChart from './Admin/chart/AOVChart';
import RevenueChart from './Admin/chart/RevenueChart';

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800, easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh()
  }, [])
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 '>


      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/allcategory' element={<Allcategory />} />
          <Route path='/books/:category' element={<Books />} />
          <Route path='/books' element={<Books />} />
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
        </Route>
        {/* adminside */}
        <Route path='/admin' element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route element={<AdminAuthGuard />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/statcard' element={<StatCard />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/adminorders' element={<AdminOrders />} />
            <Route path='/admin/adminbooks' element={<AdminBooks />} />
            <Route path='admin/revenue' element={<Revenue />} />
            <Route path='/admin/revenuechart' element={<RevenueChart />} />
            <Route path='/admin/addbooks' element={<AddBooks />} />
            <Route path='/admin/aovchart' element={<AOVChart />} />
          </Route>


        </Route>
      </Routes>



    </div >


  )
}

export default App
