import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import "./Filters.css"
import TextField from '@material-ui/core/TextField';


function Filters() {

    
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
 
    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <>
        	<div className="flex justify-between items-center pr-4">
					<h1 className="text-black font-semibold text-2xl">
						Products
					</h1>
					{/* <div className="border-gray-800 border rounded h-7 w-8 p-1 flex justify-center items-center cursor-pointer">
						<img src={basket} alt="" />
					</div> */}
		</div>
        <div className="md:flex mt-3">
					<select name="category" value={category} onChange={handleCategory} className="border-gray-800 border px-1 w-full md:w-[220px] py-1 focus:border-[#005395] text-gray-900 focus:outline-none mr-28">
						<option value="">Show all products</option>
                        {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id} className ="options-filter">
                                {category.name}
                            </option>
                        ))
                    }
					</select>
					<div className="md:ml-2 flex items-center mt-2 md:mt-0 mr-28">
                    <TextField
                    type="text"
                    label="Search Product Name!"
                    variant="outlined"
                    value={search} 
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                    className="border text-gray-900 placeholder-gray-900 border-gray-800 w-full md:w-[220px] py-1 focus:border-[#005395] px-2 focus-visible:outline-none" />

						{/* <input type="text" placeholder="Search by name"
							/> */}
						{/* <img src={bigProductImg} className="w-4 h-4 -ml-8" alt="" /> */}
					</div>
                    
           
					<select value={sort} onChange={e => setSort(e.target.value)} className="border-gray-800 border px-1 w-full md:w-[220px] py-1 focus:border-[#005395] text-gray-900 focus:outline-none">
						 <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
					</select>
		
		</div>    
        </>
    )
}

export default Filters
