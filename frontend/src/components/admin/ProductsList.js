import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import "jspdf-autotable";

const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Product deleted successfully");
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, history, deleteError, isDeleted])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    width: 235,

                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 560,
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                    width: 100,
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                    width: 100,
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 100,
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `₹${(product.discountPrice)?.toFixed(2)}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    const [list, setList] = useState({ display: "block" });
    const hide = () => {
        if (list.display === "block") {
            setList({ display: "none" })
        } else {
            setList({ display: "block" })
        }
    }
    
    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div style={list} className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className={`col-12 col-md-${list.display === "block" ? 10 : 12}`}>
                    <Fragment>
                        <button className="mt-3" onClick={hide}><i class="fa fa-bars" aria-hidden="true"></i></button>
                        <h1 className="my-3" >All Products</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="cust-table px-3"
                                bordered
                                striped
                                small
                                hover scrollX scrollY maxHeight='100vh'
                                autoWidth
                                exportToCSV
                                
                            />
                        )}
                    </Fragment>
                    {/* <CSVButton  >Download me</CSVButton> */}

                </div>
            </div>
        </Fragment>
    )
}

export default ProductsList
