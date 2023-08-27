import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import CategoryImg from './category-img.png'

function Categories() {
    const state = useContext(GlobalState)
    console.log(state)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')
 console.log(categories)
    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
              
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                console.log(res)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
 
        
<>

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="max-w-4xl mx-auto mt-7 px-3 md:px-0">
			<h1 className="text-black font-bold text-center md:text-left text-2xl">
				Categories
			</h1>
                <form action="" onSubmit={createCategory}>
			<div className="md:flex mt-8 md:mt-20">
				<input type="text" placeholder="Description" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)}  className="py-3 rounded-lg text-gray-900 placeholder-gray-900 border border-gray-700 focus:outline-none focus:border-[#005395] px-3 w-full md:w-96" />
				<button className="bg-[#007A4D] py-3 mt-4 md:mt-0 md:ml-10 w-full md:w-auto text-xl md:px-24 text-center rounded-md text-white hover:opacity-90">Create</button>
			</div>
               </form>


			<div className="mt-12 md:mt-20">
                {
                    categories.map(category =>(
                        <div className="flex md:justify-start justify-between mt-6" key={category._id}>
					<div className="flex">
					<img src={CategoryImg} className="w-16 md:w-20 mr-4 md:mr-6" alt="" />
					<h3 className="text-black mr-2 md:mr-6 mt-[20px] text-xs md:text-base font-semibold">{category.name}</h3>
					</div>
					<div className="flex items-center h-[65px]">
						<button className="bg-[#005395] w-[80px] md:w-[105px] mr-1 md:mr-2 hover:opacity-90 text-sm py-2 rounded-md text-white" onClick={() => editCategory(category._id, category.name)}>Edit</button>
						<button className="bg-[#EC1C24] w-[80px] md:w-[105px] hover:opacity-80 text-sm py-2 rounded-md text-white" onClick={() => deleteCategory(category._id)}>Delete</button>
					</div>
				</div>
                    ))
                }
				



			</div>

	</div>
    </>  
    )
}

export default Categories
