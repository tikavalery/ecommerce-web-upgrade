import React from 'react'
import BtnRender from './BtnRender'
import "./ProductItem2.css"

function ProductItem2({product, isAdmin, deleteProduct, handleCheck,pagename}) {

    return (
        
     <>



        
				<div className="border border-gray-800 rounded-md px-3 py-3 md:py-2 mb-5 md:mb-2">      {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
					<h3 className="text-black text-lg text-center" title={product.title} >
					{product.title}
					</h3>
          {/* <img src={product.images.url} alt="Denim Jeans" className={pagename ==="related"? "product_card_img_related":'product_card_img'}/> */}
					<img src={product.images.url} className="w-full md:h-[220px] pt-1" alt="" />
					<div className="md:flex md:justify-between md:items-center mt-1 md:mt-4 mb-2">
					<h5 className="text-black md:w-[35%] text-center md:text-left text-lg ml-2 pt-1">
          {`$ ${product.price}`}
					</h5>
					<div className="md:w-[65%] grid grid-cols-2 gap-1 mt-3 md:mt-0">
          <BtnRender product={product} deleteProduct={deleteProduct} />
						{/* <button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white">Add to cart</button>
						<button className="bg-[#007A4D] w-full hover:opacity-90 text-xs py-2 rounded text-white">Details</button> */}
					</div>
					</div>
				</div>
			
			



{/* 
      <div className={pagename==="related"? "product_card_related" : "product_card"}>


        


      
             {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
          <img src={product.images.url} alt="Denim Jeans" className={pagename ==="related"? "product_card_img_related":'product_card_img'}/>
          <h4 title={product.title} className ="product-title">{product.title}</h4>
          <p className="price"> $ {product.price}</p>
        
          <BtnRender product={product} deleteProduct={deleteProduct} />
      
         
          </div> */}
            
     </>

     
           
       
    )
}

export default ProductItem2