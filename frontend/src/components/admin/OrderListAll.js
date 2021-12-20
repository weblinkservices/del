import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersListAll = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                    width: 210
                },
                {
                    label: 'No of Items',
                    field: 'No_of_Items',
                    sort: 'asc',
                    width: 130
                },
                {
                    label: 'Amount',
                    field: 'Amount',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Status',
                    field: 'Status',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'ItemsPrice',
                    field: 'Items_Price',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Product Name',
                    field: 'Order_Items',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'createdAt',
                    field: 'CreatedAt',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'deliveredAt',
                    field: 'DeliveredAt',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'paidAt',
                    field: 'PaidAt',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'paymentInfo',
                    field: 'Payment_Info',
                    sort: 'asc',
                    width: 100

                },
                {
                    label: 'shippingInfo',
                    field: 'Shipping_Info',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'shippingPrice',
                    field: 'Shipping_Price',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'taxPrice',
                    field: 'Tax_Price',
                    sort: 'asc'
                },
                {
                    label: 'user',
                    field: 'User_Id',
                    sort: 'asc',
                    width: 250
                },

            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                No_of_Items: order.orderItems.length,
                Amount: `₹${order.totalPrice}`,
                Status: order.orderStatus,
                Items_Price: order.itemsPrice,
                Order_Items: order.orderItems.name,
                CreatedAt: order.createdAt,
                DeliveredAt: order.deliveredAt,
                PaidAt: order.paidAt,
                Payment_Info: order.paymentInfo.status,
                Shipping_Info: order.shippingInfo.address+", "+ order.shippingInfo.city+", "+ order.shippingInfo.country+", "+ order.shippingInfo.phoneNo+", "+ order.shippingInfo.postalCode,
                Shipping_Price: order.shippingPrice,
                Tax_Price: order.taxPrice,
                User_Id: order.user,

            })
        })
        return data;
    }

    const [list, setList]= useState({display:"block"});
    const hide=()=>{
     if(list.display === "block"){
        setList({display:"none"})
     }else{
        setList({display:"block"})
     }
    }

    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div style={list} className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className={`col-12 col-md-${list.display === "block" ? 10 : 12}`}>
                    <Fragment>
                    <button className="mt-3" onClick={hide}><i class="fa fa-bars" aria-hidden="true"></i></button>
                        <h1 className="my-3">All Orders</h1>

                        {loading ? <Loader /> : (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    {...setOrders()}
                                    components={{
                                        Toolbar: GridToolbar,
                                    }}
                                />
                            </div>
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersListAll
