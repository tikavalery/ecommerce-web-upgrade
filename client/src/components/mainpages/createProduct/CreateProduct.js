import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'
import UploadImg from './upload.png'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}
function CreateProduct() {
    const state = useContext(GlobalState)
    console.log(state)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        console.log(param.id)
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    console.log(product)
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
{/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}

<div className="max-w-4xl mx-auto mt-7 px-3 md:px-0">
			<h1 className="text-black font-bold text-center md:text-left text-2xl">
				Add Product
			</h1>

			<div className="md:grid grid-cols-2 mt-6 mb-16 md:mb-8">
                <form action="">
                <div className="md:w-[320px] md:ml-12">
					<input 
                         placeholder="Product Id"
						className="border text-gray-900 placeholder-gray-900 border-gray-800 w-full py-1 focus:border-[#005395] px-2 focus-visible:outline-none" 
                        name="product_id"
                        type="number" 
                        required
                        value={product.product_id}
                        onChange={handleChangeInput}
                        disabled={onEdit} />
					<input 
                        type="text" 
                        placeholder="Title"
                        name="title"
                        required
                        value={product.title}
                        onChange={handleChangeInput} 
						className="border text-gray-900 mt-3 placeholder-gray-900 border-gray-800 w-full py-1 focus:border-[#005395] px-2 focus-visible:outline-none" />
					<input 
                        type="number" 
                        placeholder="Price &nbsp; &nbsp; &nbsp; $00"
						className="border text-gray-900 mt-3 placeholder-gray-900 border-gray-800 w-full pt-2 pb-1 focus:border-[#005395] px-2 focus-visible:outline-none" 
                        name="price"
                        required
                        value={product.price}
                        onChange={handleChangeInput}/>
                    <textarea 
                            placeholder="Description" 
                            rows="5" 
                            className="border text-gray-900 mt-3 placeholder-gray-900 border-gray-800 w-full pt-2 pb-1 focus:border-[#005395] px-2 focus-visible:outline-none"
                            multiline
                     
                        variant="outlined" 
                        value={product.description}
                         onChange={handleChangeInput}
                        type="text" 
                        name="description">
                    </textarea>
					<textarea 
                        placeholder="Content" 
                        rows="4"
                        className="border text-gray-900 mt-2 placeholder-gray-900 border-gray-800 w-full pt-2 pb-1 focus:border-[#005395] px-2 focus-visible:outline-none"
                        name="content"
                        id="outlined-multiline-static"
                        label="Content"
                        multiline
                        required
                        value={product.content} 
                         onChange={handleChangeInput}
                     
                     >

                     </textarea>

					<select 
                    className="border-b border-t-0 border-r-0 border-l-0 text-gray-900 mt-3 placeholder-gray-900 border-gray-800 w-full pt-2 pb-1 px-2 focus:ring-transparent"
                    name="category"
                    label="Category"
                    value={product.category}
                    onChange={handleChangeInput}>


                       {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
					
					</select>
					<label className="text-[10px] text-gray-900">Please select a Category</label>
					<button className="bg-[#007A4D] py-3 text-xl w-full text-center rounded-md mt-8 text-white hover:opacity-90">Create Product</button>
				</div>

                </form>
	
				<div className="mt-8 md:mt-0">
					<div className="flex justify-end">


                    {
                    loading ? <div id="file_img"><Loading /></div>

                        : 
                        <div className="bg-[#E8E7E7] md:w-[380px] w-full flex items-center justify-center h-[350px]">
						<div>
							<div className="flex justify-center">
                            <span onClick={handleDestroy}>X</span>
                                {images ? <img src={images.url}/> : 	<img src={UploadImg} alt="" />}
							</div>
							<h3 className="text-lg text-black mt-2 font-semibold">Click button below to upload image</h3>
						</div>
					</div>
          
                }


					</div>
					<div className="flex justify-end">
						<label for="file-input" className="cursor-pointer">
							<input name="file"  onChange={handleUpload} id="file-input" type="file" className="sr-only" />
							<p className="bg-transparent border border-black w-[380px] py-2 text-lg text-center mt-4 text-black hover:opacity-90">Select from system</p>
						</label>
					</div>
				</div>	
			</div>

	</div>
{/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
          
        </div>
    )
}

export default CreateProduct
