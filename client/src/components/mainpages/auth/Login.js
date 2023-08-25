import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LoginImg from './login-img.png'

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
       


<div className="max-w-4xl mx-auto mt-7 px-3 md:px-0">
                {/* <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form> */}

{/* //////////////////////////////////////////////////////////////////////////////////////////// */}
			<h1 className="text-black font-bold text-center md:text-left text-2xl">
				Log In
			</h1>
            <form onSubmit={loginSubmit}>
			<div className="md:grid md:grid-cols-2 mt-8 md:mt-16">
				<div className="md:max-w-[400px]">
					<div className="bg-white shadow-lg rounded-lg pt-5 px-6 pb-24">
						<h5 className="text-gray-900 text-sm">
							New Here?      <Link to="/register" className="text-[#007A4D] font-semibold hover:text-opacity-90 cursor-pointer">Create account</Link> 
						</h5>
						<div className="mt-8">
							<label className="text-gray-900 text-sm" >Email</label>
							<input type="email" name="email"  value={user.email} onChange={onChangeInput} className="mt-1 w-full rounded-md border p-2 border-gray-700 focus-visible:outline-none focus:border-[#005395]" />
							<div className="flex justify-between mt-3">
								<label className="text-gray-900 text-sm">Password</label>
								<a href="#" className="text-[#007A4D] font-semibold hover:text-opacity-90 cursor-pointer text-sm">Forgot your password?</a>
							</div>
							<input  name="password" value={user.password} onChange={onChangeInput} type="password" className="mt-1 w-full rounded-md border border-gray-700 p-2 focus-visible:outline-none focus:border-[#005395]" />
							<button className="bg-[#007A4D] py-3 w-full text-center rounded-md mt-8 text-white hover:opacity-90">Sign In</button>
							<div className="h-[2px] w-full bg-gray-100 mt-8"></div>
							<h3 className="text-sm text-gray-900 text-center -mt-[11px] w-[120px] mx-auto bg-white">Or sign in with</h3>
							<button className="bg-white text-sm border border-gray-900 py-2 w-full items-center text-center rounded-md mt-5 text-black font-bold flex justify-center hover:opacity-90">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-7 mr-1" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
								Google
							</button>
						</div>
					</div>
				</div>
				<div className="md:flex hidden items-center">
					<img src={LoginImg} className="w-full" alt="" />
				</div>
			</div>
    </form>
	</div>
        
    )
}

export default Login
