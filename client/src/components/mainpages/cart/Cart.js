import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import CategoryImg from './category-img.png'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        console.log(payment)
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <>
                <div>
                <h1 className="text-black font-bold text-center md:text-left text-2xl">
				Shopping Cart
			</h1>
            <div className="mt-8 md:mt-12 max-w-[700px] border mb-8 rounded-lg border-gray-900 pl-3 md:pl-5 pr-3 md:pr-7 py-3 md:py-4 mx-auto">
                {
                    cart.map(product => (
                        <div className="flex justify-between mt-5" key={product._id}>
                        <div className="flex pt-1 md:pt-2">
                        <img  src={product.images.url} className="w-16 md:w-20 mr-4 md:mr-4" alt="" />
                     
                        <div>

                            <h3 className="text-black mr-2 md:mr-6 mt-[15px] text-xs md:text-base font-semibold">{product.title}</h3>
                            <div className="flex items-center">
                            
                                <svg  onClick={() => increment(product._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer text-[#2c2b2b] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <h3 className="text-black mr-2 text-xs md:text-base font-semibold">{product.quantity}</h3>
                                  <svg onClick={() => decrement(product._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer text-[#2c2b2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                            </div>
                        </div>  
                        </div>
                        <div className="flex relative items-end">
                            <svg onClick={() => removeProduct(product._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-0 right-3 cursor-pointer text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg><h3 className="text-black text-lg border-b pr-3 pb-1 md:text-2xl font-semibold">$ {product.price * product.quantity}</h3>
                        </div>
                    </div>
                    ))
                }

            </div>
           
            
            <div className="flex justify-between mr-3 mt-6">
                    <h3 className="text-black text-lg md:text-2xl font-semibold">Total</h3>
                    <h3 className="text-black text-lg md:text-2xl font-semibold">$ {total}</h3>
                </div>
                <div className="flex justify-center mt-6 md:mt-8">
                    <button className="bg-[#007A4D] py-3 w-full md:w-[75%] mx-auto text-xl text-center rounded-md text-white hover:opacity-90" total={total} tranSuccess={tranSuccess}>Checkout</button>
                    </div>
                
            
            


        </div>
        {/* //////////////////////////////////////////////////////////////////////////////////// */}
        </>

    )
}

export default Cart
