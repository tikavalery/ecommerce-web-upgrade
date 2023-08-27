import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem2 from '../utils/productItem/ProductItem2'
import ProductImg from './product-img.png'


function DetailProduct() {
    const params = useParams()
    console.log(params.id)
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const pagename = "related"

    console.log(state)
    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            {/* <div className='details-container'>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h1>{detailProduct.title}</h1>
                        <h6>#id: {detailProduct.product_id}</h6>
                        </div>
                        <div className="price-promotion">
                            <h2 className='price-promotion-title'>$ {detailProduct.price}</h2>
                            <span className='price-promotion-promotion'> 70% off</span>
                        </div>
                    
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="detailed-card-button"
                    onClick={() => addCart(detailProduct)}>
                       ADD TO CART
                    </Link>
                </div>
            </div>

            <div className='related-products'>
                <h2 className='related-products-title'>Related products</h2>
                <div className="related-products-products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem2 key={product._id} product={product} pagename = {pagename} /> : null
                        })
                    }
                </div>
            </div>

            </div>  */}
            


            {/* /////////////////////////////////////////////////////////////////////////////////// */}

            <div className="md:max-w-4xl md:mx-auto mt-7 px-4 md:px-0">
		<h1 className="text-black text-center md:text-left font-semibold text-2xl">
			Product Details
		</h1>

		<div className="md:grid md:grid-cols-2 mt-6 md:mt-16 md:gap-8">
			<div className="border border-gray-800 rounded-md py-4 px-4 md:px-8">
				
                <img src={detailProduct.images.url}className="w-full" alt=""  />
			</div>
			<div>
				<h3 className="text-xl md:text-lg font-semibold text-black mt-3 md:mt-0">{detailProduct.title}</h3>
                <h6 className="text-xl md:text-lg font-semibold text-black mt-3 md:mt-0" >#id: {detailProduct.product_id}</h6>
				<div className="flex mt-2 md:mt-4 items-center">
					<h3 className="text-2xl font-semibold text-black">$ {detailProduct.price}</h3>
					<button className="cursor-default bg-[#FFB612] px-4 py-1 ml-6 text-black text-sm">70% off</button>
				</div>
				<p className="mt-3 md:mt-6 text-black text-xs">
                {detailProduct.description}
				</p>
                <p className="mt-3 md:mt-6 text-black text-xs">Sold: {detailProduct.sold}</p>
				<button onClick={() => addCart(detailProduct)} className="bg-[#007A4D] hover:opacity-90 text-sm py-2 px-5 mt-4 md:mt-6 rounded-sm text-white" >Add to cart</button>
			</div>
		</div>

		<h1 className="text-black text-center font-semibold text-xl mt-8 md:mt-12">
			Related Products
		</h1>
			<div className="mt-4 mb-12">
				<div className="md:grid md:grid-cols-4 md:gap-4">
                {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem2 key={product._id} product={product} pagename = {pagename} /> : null
                        })
                    }
	
					{/* <div className="border border-gray-800 rounded-md px-3 py-2 mb-4 md:mb-2">
						<h3 className="text-black text-lg text-center">
							Product Name
						</h3>
						<img src={ProductImg} className="w-full md:h-[160px] pt-1" alt="" />
						<h5 className="text-black text-base text-center pt-1">
							$20
						</h5>
						<div className="flex justify-center mt-5 mb-2">
							<button className="bg-[#007A4D] w-[75%] hover:opacity-90 text-sm py-2 rounded-sm text-white">Add to cart</button>
						</div>
					</div> */}
				</div>
			</div>
	</div>
        </>
    )
}

export default DetailProduct
