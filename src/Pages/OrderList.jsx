import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderItem from '../Components/OrderItem';
import Pagination from '../Components/Pagination';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrderPerPage] = useState(3);
  const [loading, setLoading] = useState(false);
  console.log(orders);

  useEffect(() => {
    setLoading(true)
    axios.get('https://woo-swiftly-secret-whispers.wpcomstaging.com/wp-json/wc/v3/orders?consumer_key=ck_cd0ad13e91f41e843f0e74c7ec545fce85a2a633&consumer_secret=cs_2c32cafd87935cf207df7350f7d468133eaa6717').then((res) => {
      setOrders(res.data)
      setLoading(false)
      console.log('response---', res.data)
    })
  }, [])

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrder = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // Decrement price along plus button click
  const handleIncrement = async (orderId) => {
    try {
      console.log("increment response", orderId);
      const filteredItems = orders.filter((order, key) => {
        if (order.line_items.length > 1) {  // line_items.length = count
          if (order.id === orderId) {
            const actualPrice = order.total / order.line_items.length
            order.line_items.length += 1
            order.total = actualPrice * order.line_items.length
            console.log(order.total);

          }
          return order
        } else {
          return orderId != order.id // return when the current quantity is 1
        }
      })
      setOrders(filteredItems)
    } catch (error) {
      console.error('Server error:', error);
    }
  }

  // Decrement price along minus button click
  const handleDecrement = async (orderId) => {
    try {
      console.log("increment response", orderId);
      const filteredItems = orders.filter((order, key) => {
        if (order.line_items.length > 1) {  // line_items.length = count
          if (order.id === orderId) {
            const actualPrice = order.total / order.line_items.length
            order.line_items.length -= 1
            order.total = actualPrice * order.line_items.length
          }
          return order
        } else {
          return orderId != order.id // return when the current quantity is 1
        }
      })
      setOrders(filteredItems)
    } catch (error) {
      console.error('Server error:', error);
    }
  }

  return (
    <>

      <div className='d-flex justify-center bg-amber-100'>
        <h1 className='text-center text-xl mb-2 '>ORDERS  LIST</h1>
      </div>

      <OrderItem orders={currentOrder} loading={loading} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>

      <Pagination length={orders.length} ordersPerPage={ordersPerPage} handlePagination={handlePagination} currentPage={currentPage} />
    </>
  )
}

export default OrderList
