import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import basket from './akar-icons_cart.png'

function Header() {
    const state = useContext(GlobalState)

    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <Link to="/create_product" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Create Proudcts</Link>
       <Link to="/category" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Categories</Link>

               
            </>
        )
    }

//     <div className="bg-[#005395]">
//     <div className="md:max-w-4xl md:mx-auto flex justify-end py-4">
//         <a href="/products.html" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Products</a>
//         <a href="#" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Create Proudcts</a>
//         <a href="/categories.html" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Categories</a>
//         <a href="/order.html" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Customer Orders</a>
//     </div>
// </div>

    const loggedRouter = () =>{
        return(
            <>
                <Link to="/history" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">{isAdmin ? 'Customer Order' : 'Your Order History'}s</Link>
                <Link to="/" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8" onClick={logoutUser}>Logout</Link>

            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <div className="bg-[#005395]">
                <div className="md:max-w-4xl md:mx-auto flex justify-end py-4">
            {/* <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div> */}

            
                
                    <Link to="/" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">{isAdmin ? 'Admin DashBoard' : 'African Food Online'}</Link>
         

            
                <Link to="/" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">{isAdmin ? 'Products' : 'Store Products'}</Link>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <Link to="/login" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Login or Register</Link>
                }

             
                    {/* <img onClick={() => setMenu(!menu)} src={Close} alt="" width="30" className="menu" /> */}
                

            

            {
                isAdmin ? '' 
                :
                    <span  className="border-gray-800 border rounded h-7 w-8 p-1 flex justify-center items-center cursor-pointer">{cart.length}  <Link to="/cart">
                     	
						<img className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8 cart-icon" src={basket} alt="" />
					
                    </Link></span>
                  
                
            }
           </div> 
        </div>
    )
}

export default Header
