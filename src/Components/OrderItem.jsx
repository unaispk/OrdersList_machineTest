import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Loading'

const OrderItem = ({orders,loading,handleIncrement,handleDecrement}) => {
    
    

    useEffect(()=>{
        axios.get('https://woo-swiftly-secret-whispers.wpcomstaging.com/wp-json/wc/v3/orders?consumer_key=ck_cd0ad13e91f41e843f0e74c7ec545fce85a2a633&consumer_secret=cs_2c32cafd87935cf207df7350f7d468133eaa6717').then((res)=>{
            setData(res.data)
        })
    },[])
    

    



    return (
        <>  
    {
        loading  ? <div className='flex justify-center mt-22 mb-20'><Loading /></div> :

        orders.map((data, index) => (
            <div className="bg-neutral-50 shadow-md rounded-lg mt-8 mb-3" >
                <div className="">
                    <div className="flex justify-around items-center">
                        
                        <div>
                            <h5 className="text-lg ml-6 font-semibold">Order Id :{data.id}</h5>
                        </div>
                        <div>
                            <h5 className="text-lg ml-6 font-semibold">{data.date_created.split('T')[0]}</h5>
                        </div>

                        <div>
                            <h5 className="text-lg  font-semibold">{data.billing.first_name}</h5>
                        </div>
                        <div className="flex items-center">
                            <div className="w-10">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded" onClick={()=>{handleDecrement(data.id)}}>-</button>
                            </div>
                            <div className="w-10">
                                <h5 className="text-lg font-semibold">{data.line_items.length}</h5>
                            </div>
                            <div className="w-10">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"onClick={()=>{handleIncrement(data.id)}}>+</button>
                            </div>
                            <div className="w-20">
                                <h5 className="text-lg font-semibold"><i className="fa fa-inr"></i>Rs: {data.total}</h5>
                            </div>
                            <div className="w-22">
                                <h5 className="text-lg font-semibold"><i className="fa fa-inr"></i>{data.status}</h5>
                            </div>
                            <a href="#" className="text-gray-400"><i className="fa-solid fa-trash-can text-red-600"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
            


        </>
    )
}

export default OrderItem
