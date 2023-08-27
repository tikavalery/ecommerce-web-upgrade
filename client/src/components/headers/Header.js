import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
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
    

            
                
                    <Link to="/" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">{isAdmin ? 'Admin DashBoard' : 'African Food Online'}</Link>
         

            
                <Link to="/" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">{isAdmin ? 'Products' : 'Store Products'}</Link>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <Link to="/login" className="text-white text-xs md:text-sm hover:text-opacity-95 cursor-pointer mr-3 md:mr-8">Login or Register</Link>
                }

             
                

            

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
