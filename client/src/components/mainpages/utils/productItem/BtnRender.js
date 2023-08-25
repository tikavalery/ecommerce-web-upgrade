import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    
    return (
        <>


          {/* <BtnRender product={product} deleteProduct={deleteProduct} /> */}
						{/* <button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white">Add to cart</button>
						<button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white">Details</button> */}
					
            {
                isAdmin ? 
                <>
                <button>        <Link className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link></button>
            <button> <Link className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white" to={`/edit_product/${product._id}`} >
                        Edit
                    </Link></button>
                   
                </>
                    : <>
                  <button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white" > <Link to="#!" onClick={() => addCart(product)}>
                       Add to Cart
                    </Link></button>
                              
                     <button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white"> <Link to={`/detail/${product._id}`} >
                        View More
                       </Link>   </button>
                          
                  
                    
                </>
            }
                
        </>
    )
}

export default BtnRender
