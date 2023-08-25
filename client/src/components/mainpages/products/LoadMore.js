import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result
    console.log(page)
    console.log(result)
    return (
        
<div className="flex justify-center mt-4">

{
                result < page * 9 ? ""
                : <button className="text-black font-semibold text-lg px-20 py-2 border hover:opacity-90 border-black rounded-md" onClick={() => setPage(page+1)}>Load more</button>
            }

</div>
        
        
    )
}

export default LoadMore
