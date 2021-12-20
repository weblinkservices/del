import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductsListAll = ({ history }) => {
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
                    width: 200,
                    

                },
                {
                    label: 'Name',
                    field: 'Name',
                    sort: 'asc',
                    width: 400
                },
                {
                    label: 'Category',
                    field: 'Category',
                    sort: 'asc',
                },
                {
                    label: 'Stock',
                    field: 'Stock',
                    sort: 'asc',
                },
                
                {
                    label: 'Discount',
                    field: 'Discount',
                    sort: 'asc',
                },
                {
                    label: 'List Price',
                    field: 'ListPrice',
                    sort: 'asc',
                },
                {
                    label: 'Price',
                    field: 'Price',
                    sort: 'asc',
                },
                {
                    label: 'Description',
                    field: 'Description',
                    sort: 'asc',
                    width: 400
                },
                {
                    label: 'Ratings',
                    field: 'Ratings',
                    sort: 'asc'
                },
                
                {
                    label: 'NumOfReviews',
                    field: 'NumOfReviews',
                    sort: 'asc'
                },
                {
                    label: 'Seller',
                    field: 'Seller',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'CreatedAt',
                    sort: 'asc',
                    width: 100
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                Name: product.name,
                Category: product.category,
                Stock: product.stock,
                Price: `${(product.discountPrice)?.toFixed(2)}`,
                ListPrice: `${(product.price)?.toFixed(2)}`,
                Discount: product.discount,
                Description : product.description,
                Ratings: product.ratings,
                NumOfReviews: product.numOfReviews,
                Seller: product.seller,
                CreatedAt: product.createdAt,
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
            <MetaData title={'All Products'} />
            <div className="row">
                <div style={list} className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className={`col-12 col-md-${list.display === "block" ? 10 : 12}`}>
                    <Fragment>
                    <button className="mt-3" onClick={hide}><i class="fa fa-bars" aria-hidden="true"></i></button>
                        <h1 className="my-3">All Products</h1>
                        {loading ? <Loader /> : (
                             <div style={{ height: 1000, width: '100%' }}>
                                   <DataGrid
                                     {...setProducts()}
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

export default ProductsListAll
