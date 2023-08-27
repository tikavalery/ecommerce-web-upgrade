import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios' 
import RegisterImg from './register-img.png'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>


        {/* //////////////////////////////////////////////////////////////////////////////// */}
        
        <div className="max-w-4xl mx-auto mt-7 px-3 md:px-0">
			<h1 className="text-black font-bold text-center md:text-left text-2xl">
				Register
			</h1>
            <form  onSubmit={registerSubmit}>
			<div className="md:flex mt-8 md:mt-16">
				<div className="md:w-[45%]">
					<div className="bg-white shadow-lg rounded-lg pt-5 px-6 pb-24">
						<h5 className="text-gray-900 text-sm">
							Already have an account? <Link to="/login"  className="text-[#007A4D] font-semibold hover:text-opacity-90 cursor-pointer">Login</Link>
						</h5>
						<div className="mt-8">
							<label className="text-gray-900 text-sm">Name</label>
							<input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}  className="mt-1 w-full rounded-md border p-2 border-gray-900 focus-visible:outline-none focus:border-[#005395]" />
                         

							<label className="text-gray-900 text-sm mt-3">Email</label>
							<input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} className="mt-1 w-full rounded-md border p-2 border-gray-900 focus-visible:outline-none focus:border-[#005395]" />

                            <div className="flex justify-between mt-3">
								<label className="text-gray-900 text-sm">Password</label>
								<label className="text-[#007A4D] font-semibold hover:text-opacity-90 cursor-pointer text-sm">Forgot your password?</label>
							</div>
							<input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} className="mt-1 w-full rounded-md border p-2 border-gray-900 focus-visible:outline-none focus:border-[#005395]" />
                   

                            <button className="bg-[#007A4D] py-3 w-full text-center rounded-md mt-8 text-white hover:opacity-90">Sign up</button>
							{/* <div className="h-[2px] w-full bg-gray-100 mt-8"></div>
							<h3 className="text-sm text-gray-900 text-center -mt-[11px] w-[120px] mx-auto bg-white">Or sign up with</h3>
							<button className="bg-white text-sm border border-gray-900 py-2 w-full items-center text-center rounded-md mt-5 text-black font-bold flex justify-center hover:opacity-90">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-7 mr-1" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
								Google
							</button> */}
						</div>
					</div>
				</div>
				<div className="md:w-[55%] md:block hidden pl-4 pt-24">
					<img src={RegisterImg} className="w-full" alt="" />
				</div>
			</div>
          </form>

	</div>
        </>

    )
}

export default Register