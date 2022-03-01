import { useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails'
import Nav from "./components/layout/Nav"

//Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder'
import OrderSuccess from './components/cart/OrderSuccess'

//Orders Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

//Auth or User Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import UpdateUser from './components/admin/UpdateUser';

//Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import ProductsListAll from './components/admin/ProductsListAll';
import StockList from './components/admin/StockList';
import NewProduct from './components/admin/NewProduct';
import OrderList from './components/admin/OrderList';
import OrderListAll from './components/admin/OrderListAll';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';


import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/userActions'; 
import store from './store'
import './App.css';

import {useSelector} from 'react-redux'
import UpdateProduct from './components/admin/UpdateProduct';
import ProductReviews from './components/admin/ProductReviews';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
    <div className='App'>
     <Header/>
     {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Nav />
        )}
     <div className="">
     <Route path="/" component={Home} exact />
     <Route path="/search/:keyword" component={Home} />
     <Route path="/product/:id" component={ProductDetails} exact />

     <Route path="/cart" component={Cart} exact />
     <ProtectedRoute path="/shipping" component={Shipping} />
     <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
     <ProtectedRoute path="/success" component={OrderSuccess} />
    
     <Route path="/login"  component={Login} />
     <Route path="/register" component={Register} />
     <Route path="/password/forgot" component={ForgotPassword} />
     <Route path="/password/reset/:token" component={NewPassword} />
     <ProtectedRoute path="/me" component={Profile} exact/>
     <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
     <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
    

     <ProtectedRoute path="/orders/me" component={ListOrders} exact/>
     <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>
     </div>

     <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
     <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
     <ProtectedRoute path="/admin/productsAll" isAdmin={true} component={ProductsListAll} exact/>
     <ProtectedRoute path="/admin/stocks" isAdmin={true} component={StockList} exact/>
     <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
     <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>

     <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList} exact/>
     <ProtectedRoute path="/admin/ordersAll" isAdmin={true} component={OrderListAll} exact/>
     <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>
     <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact/>
     <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact/>
     <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact/>

    
     {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}

    </div>
    </Router>
  );
}

export default App;
